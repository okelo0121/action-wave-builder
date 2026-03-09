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
            const savedWalletId = localStorage.getItem('wallet_id') ?? FREIGHTER_ID;

            // Reject obviously invalid keys before touching the wallet extension.
            // Stellar public keys are always 56-character G-addresses.
            if (!savedKey || !/^G[A-Z2-7]{55}$/.test(savedKey)) {
                localStorage.removeItem('wallet_key');
                localStorage.removeItem('wallet_id');
                return;
            }

            try {
                kit.setWallet(savedWalletId);

                // Re-verify the address from the extension. If the user switched
                // accounts or revoked access the returned address will differ,
                // and we must not trust the stale localStorage value.
                const { address } = await kit.getAddress();
                if (address !== savedKey) {
                    throw new Error('Wallet address mismatch — session cleared');
                }

                setConnected(true);
                setPublicKey(address);
                fetchBalance(address);
            } catch (e) {
                console.warn('Failed to restore wallet session:', e);
                // Clear stale session so the user is prompted to reconnect.
                localStorage.removeItem('wallet_key');
                localStorage.removeItem('wallet_id');
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
            localStorage.setItem('wallet_id', walletId);

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
        localStorage.removeItem('wallet_id');
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
