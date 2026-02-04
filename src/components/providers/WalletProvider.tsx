import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { isConnected, requestAccess, getAddress, getNetwork } from '@stellar/freighter-api';
import { toast } from 'sonner';

interface WalletContextType {
    isConnected: boolean;
    publicKey: string | null;
    balance: string | null;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    isConnecting: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [connected, setConnected] = useState(false);
    const [publicKey, setPublicKey] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    const fetchBalance = async (address: string) => {
        try {
            const { network } = await getNetwork();
            const serverUrl = network === 'TESTNET'
                ? 'https://horizon-testnet.stellar.org'
                : 'https://horizon.stellar.org';

            const response = await fetch(`${serverUrl}/accounts/${address}`);
            if (!response.ok) {
                // Account might not exist yet
                setBalance("0");
                return;
            }

            const data = await response.json();
            const nativeBalance = data.balances.find((b: any) => b.asset_type === 'native');

            if (nativeBalance) {
                setBalance(nativeBalance.balance);
            } else {
                setBalance("0");
            }
        } catch (error) {
            console.error("Error fetching balance:", error);
            setBalance(null);
        }
    };

    useEffect(() => {
        // Check if previously connected
        const checkConnection = async () => {
            try {
                const { isConnected: connected } = await isConnected();
                if (connected) {
                    const { address } = await getAddress();
                    if (address) {
                        setConnected(true);
                        setPublicKey(address);
                        fetchBalance(address);
                    }
                }
            } catch (error) {
                console.error("Error checking wallet connection:", error);
            }
        };

        checkConnection();
    }, []);

    const connectWallet = async () => {
        setIsConnecting(true);
        try {
            // Check if Freighter is installed
            const { isConnected: isFreighterInstalled } = await isConnected();

            if (!isFreighterInstalled) {
                toast.error("Freighter wallet not found! Please install the extension.");
                window.open('https://www.freighter.app/', '_blank');
                setIsConnecting(false);
                return;
            }

            const { address, error } = await requestAccess();

            if (error) {
                toast.error(error);
                setIsConnecting(false);
                return;
            }

            setConnected(true);
            setPublicKey(address);
            fetchBalance(address);
            toast.success("Wallet connected successfully!");
        } catch (error) {
            console.error("Connection error:", error);
            toast.error("Failed to connect wallet.");
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnectWallet = () => {
        setConnected(false);
        setPublicKey(null);
        setBalance(null);
        toast.info("Wallet disconnected");
    };

    return (
        <WalletContext.Provider value={{ isConnected: connected, publicKey, balance, connectWallet, disconnectWallet, isConnecting }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};
