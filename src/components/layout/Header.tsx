import { Search, Waves, Menu, Wallet, Copy, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWallet } from "@/components/providers/WalletProvider";
import { toast } from "sonner";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between">
        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-white/10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-card border-none text-foreground">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-foreground">
                  <div className="h-20 w-20">
                    <img src="/actionlogo.png" alt="Action Wave" className="w-full h-full object-contain" />
                  </div>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-sm font-medium hover:text-primary transition-colors py-2">
                  Protocol
                </Link>
                <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors py-2">
                  Dashboard
                </Link>
                <Link to="/create-circle" className="text-sm font-medium hover:text-primary transition-colors py-2">
                  Create Circle
                </Link>
                <Link to="/profile" className="text-sm font-medium hover:text-primary transition-colors py-2">
                  Profile
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Mobile Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10">
              <img src="/actionlogo.png" alt="Action Wave" className="w-full h-full object-contain" />
            </div>
          </Link>
        </div>

        {/* Desktop Logo */}
        <Link to="/" className="hidden md:flex items-center gap-3 group">
          <div className="h-32 w-32 transition-transform group-hover:scale-105">
            <img src="/actionlogo.png" alt="Action Wave" className="w-full h-full object-contain" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Protocol
          </Link>
          <Link
            to="/dashboard"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Dashboard
          </Link>
          <Link
            to="/create-circle"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/create-circle') ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Create Circle
          </Link>
          <Link
            to="/profile"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/profile') ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Profile
          </Link>
        </nav>

        {/* Right side Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Network Status Pill */}
          <div className="hidden lg:flex items-center px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground backdrop-blur-sm hover:border-primary/30 transition-colors cursor-default">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />
            Stellar Mainnet
          </div>

          <WalletButton />
        </div>
      </div>
    </header>
  );
};

const WalletButton = () => {
  const { isConnected, publicKey, balance, connectWallet, disconnectWallet, isConnecting } = useWallet();

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      toast.success("Address copied to clipboard!");
    }
  };

  if (isConnected && publicKey) {
    const truncatedKey = `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="rounded-full bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 font-semibold px-6 transition-all"
          >
            <Wallet className="mr-2 h-4 w-4" />
            {truncatedKey}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-card border-white/10 text-foreground">
          <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem className="flex flex-col items-start cursor-default focus:bg-transparent">
            <span className="text-xs text-muted-foreground">Balance</span>
            <span className="font-medium text-primary">
              {balance ? `${parseFloat(balance).toLocaleString()} XLM` : "Loading..."}
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem onClick={copyAddress} className="cursor-pointer hover:bg-white/5 focus:bg-white/5">
            <Copy className="mr-2 h-4 w-4" />
            Copy Address
          </DropdownMenuItem>
          <DropdownMenuItem onClick={disconnectWallet} className="text-red-500 cursor-pointer hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      onClick={connectWallet}
      disabled={isConnecting}
      className="rounded-full bg-white text-black hover:bg-white/90 font-semibold px-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
    >
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}

export default Header;
