import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useWallet } from './WalletProvider';
import { toast } from 'sonner';
import { signTransaction, getNetwork } from '@stellar/freighter-api';
import * as StellarSdk from 'stellar-sdk';

// TYPES
export interface Circle {
    id: string;
    name: string;
    contributionAmount: string; // stored as string for precision
    cyclePeriod: string;
    memberCount: number;
    maxMembers: number;
    createdAt: number;
    status: 'enrolling' | 'active' | 'completed';
}

export interface Transaction {
    id: string;
    type: 'deposit' | 'payout' | 'join';
    amount: string;
    date: string;
    hash?: string;
    status: 'pending' | 'confirmed' | 'failed';
}

interface ProtocolContextType {
    circles: Circle[];
    transactions: Transaction[];
    createCircle: (data: Omit<Circle, 'id' | 'createdAt' | 'status'>) => Promise<void>;
    depositToCircle: (circleId: string, amount: string) => Promise<void>;
    joinCircle: (circleId: string) => Promise<void>;
}

const ProtocolContext = createContext<ProtocolContextType | undefined>(undefined);

// CONFIG
// TODO: Ideally this should be a real multisig or smart contract address.
// For now, we will use a "Treasury" placeholder.
// Users can update this to their own address for testing.
const TREASURY_ADDRESS = "GBA6YOE2M5D25N6446R6J44665446545646545645645645645645645";

export const ProtocolProvider = ({ children }: { children: ReactNode }) => {
    const { publicKey, isConnected } = useWallet();
    const [circles, setCircles] = useState<Circle[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // Load from LocalStorage on mount
    useEffect(() => {
        const savedCircles = localStorage.getItem('action_wave_circles');
        const savedTxs = localStorage.getItem('action_wave_txs');

        try {
            if (savedCircles) setCircles(JSON.parse(savedCircles));
        } catch (e) {
            console.error("Failed to parse saved circles", e);
            localStorage.removeItem('action_wave_circles');
        }

        try {
            if (savedTxs) setTransactions(JSON.parse(savedTxs));
        } catch (e) {
            console.error("Failed to parse saved transactions", e);
            localStorage.removeItem('action_wave_txs');
        }
    }, []);

    // Save to LocalStorage on change
    useEffect(() => {
        localStorage.setItem('action_wave_circles', JSON.stringify(circles));
        localStorage.setItem('action_wave_txs', JSON.stringify(transactions));
    }, [circles, transactions]);

    const createCircle = async (data: Omit<Circle, 'id' | 'createdAt' | 'status'>) => {
        // 1. Simulate "deployment" (just saving local state for now)
        // In a real app, this might invoke a Factory Contract.
        const newCircle: Circle = {
            ...data,
            id: crypto.randomUUID(),
            createdAt: Date.now(),
            status: 'enrolling',
        };

        setCircles(prev => [newCircle, ...prev]);
        toast.success("Circle deployed successfully!");
    };

    const depositToCircle = async (circleId: string, amount: string) => {
        if (!isConnected || !publicKey) {
            toast.error("Please connect your wallet first");
            return;
        }

        try {
            const circle = circles.find(c => c.id === circleId);
            if (!circle) throw new Error("Circle not found");

            // 1. Prepare Transaction
            const { network } = await getNetwork();
            const isTestnet = network === 'TESTNET';
            const serverUrl = isTestnet ? 'https://horizon-testnet.stellar.org' : 'https://horizon.stellar.org';
            const server = new StellarSdk.Horizon.Server(serverUrl);

            const sourceAccount = await server.loadAccount(publicKey);

            const tx = new StellarSdk.TransactionBuilder(sourceAccount, {
                fee: StellarSdk.BASE_FEE,
                networkPassphrase: isTestnet ? StellarSdk.Networks.TESTNET : StellarSdk.Networks.PUBLIC,
            })
                .addOperation(StellarSdk.Operation.payment({
                    destination: TREASURY_ADDRESS, // Use Treasury as destination for now
                    asset: StellarSdk.Asset.native(),
                    amount: amount,
                }))
                .setTimeout(30)
                .build();

            // 2. Sign with Freighter
            const xdr = tx.toXDR();
            const signedTx = await signTransaction(xdr, {
                network: isTestnet ? "TESTNET" : "PUBLIC",
            });

            if (signedTx.error) {
                throw new Error(signedTx.error);
            }

            // 3. Submit Transaction
            const txResult = await server.submitTransaction(new StellarSdk.Transaction(signedTx.signedTxXdr, isTestnet ? StellarSdk.Networks.TESTNET : StellarSdk.Networks.PUBLIC));

            // 4. Log Success
            const newTx: Transaction = {
                id: txResult.hash,
                type: 'deposit',
                amount,
                date: new Date().toISOString(),
                hash: txResult.hash,
                status: 'confirmed',
            };

            setTransactions(prev => [newTx, ...prev]);
            toast.success(`Succesfully deposited ${amount} XLM!`);

        } catch (error: any) {
            console.error("Deposit failed:", error);
            toast.error(error.message || "Failed to process deposit");
        }
    };

    const joinCircle = async (circleId: string) => {
        // Assuming joining requires an initial deposit of collateral
        const circle = circles.find(c => c.id === circleId);
        if (!circle) return;

        await depositToCircle(circleId, circle.contributionAmount);

        // Update member count logic would go here
        setCircles(prev => prev.map(c =>
            c.id === circleId ? { ...c, memberCount: Math.min(c.memberCount + 1, c.maxMembers) } : c
        ));
    };

    return (
        <ProtocolContext.Provider value={{ circles, transactions, createCircle, depositToCircle, joinCircle }}>
            {children}
        </ProtocolContext.Provider>
    );
};

export const useProtocol = () => {
    const context = useContext(ProtocolContext);
    if (context === undefined) {
        throw new Error('useProtocol must be used within a ProtocolProvider');
    }
    return context;
};
