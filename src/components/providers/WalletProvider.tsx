import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import {
    StellarWalletsKit,
    StellarWalletsModal,
    WalletNetwork,
    FREIGHTER_ID,
    FreighterModule,
    AlbedoModule,
    xBullModule,
    LobstrModule,
} from '@creit.tech/stellar-wallets-kit';
import {
    WalletConnectModule,
    WalletConnectAllowedMethods,
} from '@creit.tech/stellar-wallets-kit/modules/walletconnect.module';

// Importing StellarWalletsModal registers the <stellar-wallets-modal> custom
// element via its @customElement decorator — required for kit.openModal() to work.
void StellarWalletsModal;

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

// WalletConnect enables Lobstr mobile and any other WalletConnect-compatible wallet.
// Set VITE_WALLETCONNECT_PROJECT_ID in .env to activate.
const WC_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string | undefined;

export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [connected, setConnected] = useState(false);
    const [publicKey, setPublicKey] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    const [kit] = useState(() => {
        const modules = [
            new FreighterModule(),
            new AlbedoModule(),
            new xBullModule(),
            new LobstrModule(),
        ];

        if (WC_PROJECT_ID) {
            modules.push(
                new WalletConnectModule({
                    projectId: WC_PROJECT_ID,
                    name: 'Action Wave',
                    description: 'Action Wave savings circles',
                    url: window.location.origin,
                    icons: [`${window.location.origin}/favicon.ico`],
                    method: WalletConnectAllowedMethods.SIGN,
                    network: WalletNetwork.TESTNET,
                })
            );
        }

        return new StellarWalletsKit({
            network: WalletNetwork.TESTNET,
            selectedWalletId: FREIGHTER_ID,
            modules,
        });
    });

    const fetchBalance = async (address: string) => {
        try {
            const response = await fetch(`https://horizon-testnet.stellar.org/accounts/${address}`);
            if (!response.ok) { setBalance('0'); return; }
            const data = await response.json();
            const native = data.balances?.find((b: { asset_type: string }) => b.asset_type === 'native');
            setBalance(native ? native.balance : '0');
        } catch {
            setBalance(null);
        }
    };

    // On mount: restore a saved session only after re-verifying with the extension.
    useEffect(() => {
        const checkConnection = async () => {
            const savedKey = localStorage.getItem('wallet_key');
            const savedWalletId = localStorage.getItem('wallet_id') ?? FREIGHTER_ID;

            if (!savedKey || !/^G[A-Z2-7]{55}$/.test(savedKey)) {
                localStorage.removeItem('wallet_key');
                localStorage.removeItem('wallet_id');
                return;
            }

            try {
                kit.setWallet(savedWalletId);
                const { address } = await kit.getAddress();
                if (address !== savedKey) throw new Error('Wallet address changed since last session');
                setConnected(true);
                setPublicKey(address);
                fetchBalance(address);
            } catch (e) {
                console.warn('Failed to restore wallet session:', e);
                localStorage.removeItem('wallet_key');
                localStorage.removeItem('wallet_id');
            }
        };

        checkConnection();
    }, [kit]);

    const connectWallet = async () => {
        // Use the kit's built-in modal — it auto-detects installed wallets,
        // shows availability status, and handles WalletConnect natively.
        await kit.openModal({
            onWalletSelected: async (option) => {
                setIsConnecting(true);
                try {
                    kit.setWallet(option.id);
                    const { address } = await kit.getAddress();
                    setConnected(true);
                    setPublicKey(address);
                    fetchBalance(address);
                    localStorage.setItem('wallet_key', address);
                    localStorage.setItem('wallet_id', option.id);
                    toast.success(`Connected: ${address.slice(0, 6)}…${address.slice(-4)}`);
                } catch (err: unknown) {
                    const message = err instanceof Error ? err.message : String(err);
                    toast.error(message || 'Failed to connect wallet');
                } finally {
                    setIsConnecting(false);
                }
            },
            onClosed: () => {
                // User dismissed the modal without selecting — no action needed.
            },
        });
    };

    const disconnectWallet = () => {
        setConnected(false);
        setPublicKey(null);
        setBalance(null);
        localStorage.removeItem('wallet_key');
        localStorage.removeItem('wallet_id');
        toast.info('Wallet disconnected');
    };

    return (
        <WalletContext.Provider value={{ isConnected: connected, publicKey, balance, connectWallet, disconnectWallet, isConnecting, kit }}>
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
