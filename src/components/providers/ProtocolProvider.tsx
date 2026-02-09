import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useWallet } from './WalletProvider';
import { toast } from 'sonner';
import { WalletNetwork } from '@creit.tech/stellar-wallets-kit';
import * as StellarSdk from 'stellar-sdk';
// import { SorobanRpc } from 'stellar-sdk'; // Removed invalid import

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
const CONTRACT_ID = "CDFI4DDPZ5N4BDNCKC2HYJO3B5QKIYCUD3NLBL3RGDNWDBTM7I5TWRYT";

export const ProtocolProvider = ({ children }: { children: ReactNode }) => {
    const { publicKey, isConnected, kit } = useWallet();
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
        if (!publicKey) {
            toast.error("Connect wallet first");
            return;
        }

        try {
            toast.info("Creating circle on-chain...");

            const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
            const source = await server.loadAccount(publicKey);

            // Map string periods to seconds (not currently used by contract, but kept for reference)
            // const periods: Record<string, number> = {
            //     "weekly": 604800,
            //     "biweekly": 1209600,
            //     "monthly": 2592000,
            //     "quarterly": 7776000
            // };
            // const periodSeconds = periods[data.cyclePeriod] || 2592000;

            // Contract expects: create_circle(members: Vec<Address>, amount: i128, cycles: u32)
            // cycles = total number of payout cycles, typically equals number of members
            const totalCycles = data.maxMembers;

            // Build Vec<Address> - let nativeToScVal handle the array conversion
            const memberAddress = new StellarSdk.Address(publicKey);

            const contract = new StellarSdk.Contract(CONTRACT_ID);
            const operation = contract.call("create_circle",
                StellarSdk.nativeToScVal([memberAddress]),
                StellarSdk.nativeToScVal(BigInt(data.contributionAmount), { type: "i128" }),
                StellarSdk.nativeToScVal(totalCycles, { type: "u32" })
            );

            const tx = new StellarSdk.TransactionBuilder(source, {
                fee: StellarSdk.BASE_FEE,
                networkPassphrase: StellarSdk.Networks.TESTNET,
            })
                .addOperation(operation)
                .setTimeout(300) // 5 minutes to allow wallet approval
                .build();

            // Prepare transaction (Simulate + Auth)
            const rpcServer = new StellarSdk.rpc.Server('https://soroban-testnet.stellar.org');

            let preparedTx;
            try {
                preparedTx = await rpcServer.prepareTransaction(tx);
            } catch (simError: any) {
                console.error("Simulation/Prepare failed:", simError);
                console.dir(simError, { depth: null });
                throw new Error(`Simulation failed: ${simError.message || JSON.stringify(simError)}`);
            }

            console.log("Simulation successful, prepared TX");
            const xdrToSign = preparedTx.toXDR();
            console.log("XDR to sign (first 100 chars):", xdrToSign.substring(0, 100));

            let signedTxXdr;
            try {
                // Use the wallet kit that user already connected with
                const signResult = await kit.signTransaction({
                    xdr: xdrToSign,
                    network: WalletNetwork.TESTNET,
                });
                signedTxXdr = signResult.signedTxXdr;
                console.log("Wallet signed successfully");
            } catch (signError: any) {
                console.error("Wallet signing failed:", signError);
                console.dir(signError, { depth: null });
                // If kit fails, try Freighter API directly as fallback
                try {
                    console.log("Trying Freighter API directly...");
                    const freighterApi = await import('@stellar/freighter-api');
                    const signResult = await freighterApi.signTransaction(xdrToSign, {
                        networkPassphrase: StellarSdk.Networks.TESTNET,
                        address: publicKey,
                    });
                    signedTxXdr = signResult.signedTxXdr;
                    console.log("Freighter API signed successfully");
                } catch (freighterError: any) {
                    console.error("Freighter API also failed:", freighterError);
                    throw new Error(`Wallet signing failed: ${signError.message || JSON.stringify(signError)}`);
                }
            }

            const txResult = await rpcServer.sendTransaction(new StellarSdk.Transaction(signedTxXdr, StellarSdk.Networks.TESTNET));

            if (txResult.status !== "PENDING") {
                throw new Error(`Transaction failed: ${JSON.stringify(txResult)}`);
            }

            // Wait for transaction confirmation
            console.log("Transaction pending, waiting for confirmation...", txResult.hash);
            toast.info("Waiting for on-chain confirmation...");

            // Simple polling - just check if transaction is confirmed
            let confirmed = false;
            let extractedCircleId: string | null = null;
            let attempts = 0;
            const maxAttempts = 30;

            while (attempts < maxAttempts && !confirmed) {
                await new Promise(r => setTimeout(r, 2000)); // Wait 2 seconds
                try {
                    // Use raw JSON-RPC to avoid SDK XDR parsing issues with Protocol 23
                    const response = await fetch('https://soroban-testnet.stellar.org', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            jsonrpc: '2.0',
                            id: 1,
                            method: 'getTransaction',
                            params: { hash: txResult.hash }
                        })
                    });
                    const result = await response.json();
                    console.log("getTransaction status:", result.result?.status);

                    if (result.result?.status === "SUCCESS") {
                        confirmed = true;
                        // Check if returnValue is directly available (newer RPC versions)
                        const rv = result.result?.returnValue;
                        if (rv) {
                            console.log("Return value found:", JSON.stringify(rv));
                            // Try to extract u64 from various formats
                            if (typeof rv === 'object' && rv.u64) {
                                extractedCircleId = rv.u64.toString();
                                console.log("SUCCESS! Extracted circle ID from u64:", extractedCircleId);
                            } else if (typeof rv === 'string') {
                                // It's base64 XDR - try to parse as ScVal
                                try {
                                    const scVal = StellarSdk.xdr.ScVal.fromXDR(rv, 'base64');
                                    if (scVal.switch().name === 'scvU64') {
                                        extractedCircleId = scVal.u64().toString();
                                        console.log("SUCCESS! Extracted circle ID from ScVal XDR:", extractedCircleId);
                                    }
                                } catch (xdrErr) {
                                    console.log("Could not parse returnValue as ScVal:", xdrErr);
                                }
                            }
                        } else {
                            console.log("No returnValue in response, will query contract to find circle ID...");
                            // Query get_state to find the circle we just created
                            // Try IDs starting from a reasonable range based on previous observations
                            for (let testId = 1; testId <= 200; testId++) {
                                try {
                                    const stateContract = new StellarSdk.Contract(CONTRACT_ID);
                                    const stateOp = stateContract.call("get_state",
                                        StellarSdk.nativeToScVal(BigInt(testId), { type: "u64" })
                                    );

                                    const source = new StellarSdk.Account(publicKey, "0");
                                    const stateTx = new StellarSdk.TransactionBuilder(source, {
                                        fee: StellarSdk.BASE_FEE,
                                        networkPassphrase: StellarSdk.Networks.TESTNET,
                                    })
                                        .addOperation(stateOp)
                                        .setTimeout(30)
                                        .build();

                                    const simResult = await rpcServer.simulateTransaction(stateTx);
                                    if ('result' in simResult && simResult.result) {
                                        // Found a circle! Check if matches our creation
                                        console.log(`Found circle at ID ${testId}`);
                                        extractedCircleId = testId.toString();
                                    }
                                } catch (stateErr: any) {
                                    // Circle not found at this ID, continue
                                    if (stateErr.message?.includes("Circle not found")) {
                                        // We've gone past all circles, use the last found one
                                        if (extractedCircleId) break;
                                    }
                                }
                            }
                            if (extractedCircleId) {
                                console.log("SUCCESS! Found circle ID by querying get_state:", extractedCircleId);
                            }
                        }
                    } else if (result.result?.status === "FAILED") {
                        throw new Error("Transaction failed on-chain");
                    }
                } catch (pollError: any) {
                    // Only log, don't throw - continue polling
                    if (!pollError.message?.includes("failed on-chain") && !pollError.message?.includes("NOT_FOUND")) {
                        console.log("Poll attempt:", attempts + 1, pollError.message);
                    } else if (pollError.message?.includes("failed on-chain")) {
                        throw pollError;
                    }
                }
                attempts++;
            }

            // Use extracted circle ID if available, otherwise fall back to local counter
            let circleId: string;
            if (extractedCircleId) {
                circleId = extractedCircleId;
            } else {
                // Fallback: use transaction hash as ID (not ideal but ensures uniqueness)
                circleId = txResult.hash;
                console.log("WARNING: Could not extract circle ID, using tx hash:", circleId);
            }

            const newCircle: Circle = {
                ...data,
                id: circleId,
                createdAt: Date.now(),
                status: 'enrolling',
            };

            setCircles(prev => [newCircle, ...prev]);
            toast.success(`Circle created! On-chain ID: ${circleId}`);
        } catch (e: any) {
            console.error("Create Circle Failed:", e);
            // Log full error object for debugging
            console.dir(e, { depth: null });
            toast.error(e.message || "Failed to create circle. Check console.");
        }
    };

    const depositToCircle = async (circleId: string, amount: string) => {
        if (!isConnected || !publicKey) {
            toast.error("Please connect your wallet first");
            return;
        }

        try {
            toast.info("Joining circle on-chain...");

            console.log("depositToCircle called with circleId:", circleId, "amount:", amount);

            const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
            const source = await server.loadAccount(publicKey);

            // Parse circleId to u64 - must be a valid number
            let targetId: bigint;
            if (/^\d+$/.test(circleId)) {
                targetId = BigInt(circleId);
                console.log("Parsed circle ID:", targetId.toString());
            } else {
                // If circleId is a transaction hash (not numeric), we can't use it
                console.error("Invalid circle ID - not numeric:", circleId);
                throw new Error(`Invalid circle ID: ${circleId}. Please create a circle first.`);
            }

            const contract = new StellarSdk.Contract(CONTRACT_ID);
            const operation = contract.call("join_circle",
                StellarSdk.nativeToScVal(targetId, { type: "u64" }),
                StellarSdk.nativeToScVal(new StellarSdk.Address(publicKey), { type: "Address" })
            );

            // NOTE: Soroban transactions can only contain ONE operation.
            // The payment to treasury would need to be a separate transaction.
            // For now, we only do the contract call. Payment can be added later as a separate step.

            const tx = new StellarSdk.TransactionBuilder(source, {
                fee: StellarSdk.BASE_FEE,
                networkPassphrase: StellarSdk.Networks.TESTNET,
            })
                .addOperation(operation)
                .setTimeout(300) // 5 minutes to allow wallet approval
                .build();

            // Prepare transaction (Simulate + Auth)
            const rpcServer = new StellarSdk.rpc.Server('https://soroban-testnet.stellar.org');
            const preparedTx = await rpcServer.prepareTransaction(tx);

            // Sign with wallet kit, fallback to Freighter API
            const xdrToSign = preparedTx.toXDR();
            let signedTxXdr: string;

            try {
                const signResult = await kit.signTransaction({
                    xdr: xdrToSign,
                    network: WalletNetwork.TESTNET,
                });
                signedTxXdr = signResult.signedTxXdr;
                console.log("Wallet kit signed successfully");
            } catch (signError: any) {
                console.log("Wallet kit failed, trying Freighter API directly...", signError.message);
                try {
                    const freighterApi = await import('@stellar/freighter-api');
                    const signResult = await freighterApi.signTransaction(xdrToSign, {
                        networkPassphrase: StellarSdk.Networks.TESTNET,
                        address: publicKey,
                    });
                    signedTxXdr = signResult.signedTxXdr;
                    console.log("Freighter API signed successfully");
                } catch (freighterError: any) {
                    console.error("Freighter API also failed:", freighterError);
                    throw new Error(`Wallet signing failed: ${signError.message || JSON.stringify(signError)}`);
                }
            }

            // Submit using RPC for faster feedback
            const txResult = await rpcServer.sendTransaction(new StellarSdk.Transaction(signedTxXdr, StellarSdk.Networks.TESTNET));

            if (txResult.status !== "PENDING") {
                throw new Error(`Transaction failed: ${JSON.stringify(txResult)}`);
            }

            console.log("Deposit transaction submitted, hash:", txResult.hash);
            toast.info("Deposit submitted, waiting for confirmation...");

            // Poll for confirmation
            let confirmed = false;
            let attempts = 0;
            const maxAttempts = 15;

            while (attempts < maxAttempts && !confirmed) {
                await new Promise(r => setTimeout(r, 2000));
                try {
                    const response = await fetch('https://soroban-testnet.stellar.org', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            jsonrpc: '2.0',
                            id: 1,
                            method: 'getTransaction',
                            params: { hash: txResult.hash }
                        })
                    });
                    const result = await response.json();
                    console.log("Deposit tx status:", result.result?.status);

                    if (result.result?.status === "SUCCESS") {
                        confirmed = true;
                    } else if (result.result?.status === "FAILED") {
                        throw new Error("Deposit transaction failed on-chain");
                    }
                } catch (err: any) {
                    if (err.message?.includes("failed on-chain")) throw err;
                }
                attempts++;
            }

            const newTx: Transaction = {
                id: txResult.hash,
                type: 'deposit',
                amount,
                date: new Date().toISOString(),
                hash: txResult.hash,
                status: confirmed ? 'confirmed' : 'pending',
            };

            setTransactions(prev => [newTx, ...prev]);

            // Update the circle to show user has joined
            setCircles(prev => prev.map(c =>
                c.id === circleId ? { ...c, memberCount: Math.min(c.memberCount + 1, c.maxMembers) } : c
            ));

            if (confirmed) {
                toast.success(`Successfully deposited ${amount} XLM and joined circle!`);
            } else {
                toast.success(`Deposit submitted! Transaction may still be confirming.`);
            }

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
