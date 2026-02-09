import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useWallet } from './WalletProvider';
import { toast } from 'sonner';
import { WalletNetwork } from '@creit.tech/stellar-wallets-kit';
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
// Valid Testnet Public Key
const TREASURY_ADDRESS = "GCRRSYF5JBFPXHN5DCG65A4J3MUYE53QMQ4XMXZ3CNKWFJIJJTGMH6MZ";

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
            // Use Kit to get network or default
            // Since we don't have a direct getNetwork from Kit in this context easily without casting,
            // we will assume Testnet as per project default or fetch from WalletProvider if we exposed it.
            // For now, let's hardcode to Testnet as this is a Testnet build.
            const isTestnet = true;
            const serverUrl = 'https://horizon-testnet.stellar.org';
            const server = new StellarSdk.Horizon.Server(serverUrl);

            // NOTE: In a real app, you would call the contract here.
            // Since the contract is not deployed yet, we are simulating the behavior
            // but using the valid "Treasury" logic which effectively deposits to the pool.
            // Once deployed, you would use:
            // const contract = new StellarSdk.Contract(CONTRACT_ID);
            // const tx = contract.call("join_circle", ...);

            // For now, we keep the improved Treasury logic but ensure it uses the Kit for validation

            // 2. Validate Treasury Account
            try {
                await server.loadAccount(TREASURY_ADDRESS);
            } catch (e: any) {
                if (e.response?.status === 404) {
                    toast.info("Treasury account not found. Creating via Friendbot...");
                    try {
                        const response = await fetch(`https://friendbot.stellar.org?addr=${TREASURY_ADDRESS}`);
                        if (!response.ok) {
                            throw new Error("Failed to create treasury account via Friendbot");
                        }
                        toast.success("Treasury account created!");
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    } catch (fbError) {
                        console.error("Friendbot error:", fbError);
                        throw new Error("Failed to initialize Treasury account. Please try again.");
                    }
                } else {
                    throw e;
                }
            }

            const sourceAccount = await server.loadAccount(publicKey);

            const tx = new StellarSdk.TransactionBuilder(sourceAccount, {
                fee: StellarSdk.BASE_FEE,
                networkPassphrase: StellarSdk.Networks.TESTNET,
            })
                .addOperation(StellarSdk.Operation.payment({
                    destination: TREASURY_ADDRESS,
                    asset: StellarSdk.Asset.native(),
                    amount: amount,
                }))
                .setTimeout(30)
                .build();

            // 3. Sign with Wallet Kit
            // The Kit handles the specific wallet's signing method
            const { signedTxXdr } = await kit.signTransaction({
                xdr: tx.toXDR(),
                network: WalletNetwork.TESTNET,
            });

            // 4. Submit Transaction
            toast.info("Submitting transaction...");
            const txResult = await server.submitTransaction(new StellarSdk.Transaction(signedTxXdr, StellarSdk.Networks.TESTNET));

            // 5. Log Success
            const newTx: Transaction = {
                id: txResult.hash,
                type: 'deposit',
                amount,
                date: new Date().toISOString(),
                hash: txResult.hash,
                status: 'confirmed',
            };

            setTransactions(prev => [newTx, ...prev]);
            toast.success(`Successfully deposited ${amount} XLM!`);

        } catch (error: any) {
            console.error("Deposit failed:", error);
            if (error.response?.data?.extras?.result_codes) {
                console.error("Horizon Result Codes:", error.response.data.extras.result_codes);
            }

            let msg = error.message || "Failed to process deposit";
            if (msg.includes("op_no_destination")) msg = "Destination account does not exist.";
            if (msg.includes("op_underfunded")) msg = "Insufficient funds to complete this transaction.";

            toast.error(msg);
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
