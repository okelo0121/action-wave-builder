import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import {
    StellarWalletsKit,
    WalletNetwork,
    FREIGHTER_ID,
    ALBEDO_ID,
    XBULL_ID,
    LOBSTR_ID,
    FreighterModule,
    AlbedoModule,
    xBullModule,
    LobstrModule
} from '@creit.tech/stellar-wallets-kit';

interface WalletContextType {
    isConnected: boolean;
    publicKey: string | null;
    balance: string | null;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    isConnecting: boolean;
    kit: StellarWalletsKit;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

import { WalletModal } from '../WalletModal';

export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [connected, setConnected] = useState(false);
    const [publicKey, setPublicKey] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Initialize/Memoize the Kit
    const [kit] = useState(() => new StellarWalletsKit({
        network: WalletNetwork.TESTNET,
        selectedWalletId: FREIGHTER_ID, // Default
        modules: [
            new FreighterModule(),
            new AlbedoModule(),
            new xBullModule(),
            new LobstrModule(),
        ]
    }));

    const fetchBalance = async (address: string) => {
        try {
            // Use Kit to get network or default to testnet
            const serverUrl = 'https://horizon-testnet.stellar.org';

            const response = await fetch(`${serverUrl}/accounts/${address}`);
            if (!response.ok) {
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
        const checkConnection = async () => {
            const savedKey = localStorage.getItem('wallet_key');

            // Allow re-connection logic to verify if wallet is still accessible
            // Loop through modules or just assume Freighter for now since it's the default/main one used
            // Ideally we save the wallet ID too.
            if (savedKey) {
                try {
                    // Force set wallet to Freighter (or saved ID if we implemented that)
                    // This ensures 'kit' knows which wallet to use for signing later
                    kit.setWallet(FREIGHTER_ID);

                    // Optional: Validation (might verify session)
                    // const { address } = await kit.getAddress();
                    // if (address !== savedKey) throw new Error("Account changed");

                    setConnected(true);
                    setPublicKey(savedKey);
                    fetchBalance(savedKey);
                } catch (e) {
                    console.warn("Failed to restore wallet session:", e);
                    // Don't clear storage immediately to avoid annoyance, 
                    // but user might need to click "Connect" again if signing fails.
                }
            }
        };

        checkConnection();
    }, [kit]);

    const connectWallet = async () => {
        setIsModalOpen(true);
    };

    const handleConnect = async (walletId: string) => {
        setIsConnecting(true);
        setIsModalOpen(false);
        try {
            kit.setWallet(walletId);
            const { address } = await kit.getAddress();

            setConnected(true);
            setPublicKey(address);
            fetchBalance(address);
            localStorage.setItem('wallet_key', address);

            toast.success(`Connected to ${walletId}`);
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Failed to connect");
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnectWallet = () => {
        setConnected(false);
        setPublicKey(null);
        setBalance(null);
        localStorage.removeItem('wallet_key');
        toast.info("Wallet disconnected");
    };

    return (
        <WalletContext.Provider value={{ isConnected: connected, publicKey, balance, connectWallet, disconnectWallet, isConnecting, kit }}>
            {children}
            <WalletModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConnect={handleConnect}
            />
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
