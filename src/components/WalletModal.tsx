
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react";
import {
    FREIGHTER_ID,
    ALBEDO_ID,
    XBULL_ID,
    LOBSTR_ID
} from '@creit.tech/stellar-wallets-kit';

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConnect: (walletId: string) => void;
}

export function WalletModal({ isOpen, onClose, onConnect }: WalletModalProps) {

    const wallets = [
        { id: FREIGHTER_ID, name: "Freighter", icon: "https://freighter.app/icons/logo.svg" },
        { id: ALBEDO_ID, name: "Albedo", icon: "https://albedo.link/favicon.png" },
        { id: XBULL_ID, name: "xBull", icon: "https://xbull.app/icon-192.png" },
        { id: LOBSTR_ID, name: "LOBSTR", icon: "https://lobstr.co/static/lobstr_logo.png" },
        // WalletConnect usually requires extra setup, keeping it simple for now
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Connect Wallet</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-4 py-4">
                    {wallets.map((wallet) => (
                        <Button
                            key={wallet.id}
                            variant="outline"
                            className="flex items-center justify-between h-16 px-4 hover:bg-muted/50 transition-colors"
                            onClick={() => onConnect(wallet.id)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform">
                                    <img
                                        src={wallet.icon}
                                        alt={wallet.name}
                                        className="w-6 h-6 object-contain"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                        }}
                                    />
                                    <Wallet className="w-5 h-5 text-primary absolute hidden" />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="font-semibold text-base">{wallet.name}</span>
                                    <span className="text-xs text-muted-foreground">Connect with {wallet.name}</span>
                                </div>
                            </div>
                        </Button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
