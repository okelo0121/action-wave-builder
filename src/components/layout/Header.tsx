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
  SheetClose,
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
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto max-w-5xl bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl h-24 flex items-center justify-between px-6 transition-all duration-300 hover:border-white/20">

        {/* Logo (Left) - Always Visible - Enlarged & Text Removed */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-20 w-20 md:h-24 md:w-24 transition-transform group-hover:scale-110">
            <img src="/actionlogo.png" alt="Action Wave" className="w-full h-full object-contain" />
          </div>
        </Link>
        <div className="flex-1" /> {/* Spacer to push nav center if absolute positioning fails or just for safety, actually strictly absolute centering is better */}

        {/* Desktop Navigation (Center) */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
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
            Create
          </Link>
          <Link
            to="/profile"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/profile') ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Profile
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Desktop Connect Wallet */}
          <div className="hidden md:block">
            <WalletButton />
          </div>

          {/* Mobile Menu Trigger (Hamburger) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:bg-white/10 rounded-full">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full bg-black/80 backdrop-blur-xl border-b border-white/10 text-foreground px-4 pt-4 pb-6">
                <SheetHeader className="flex flex-row items-center justify-between mb-4">
                  <SheetTitle className="flex items-center">
                    <div className="h-12 w-12">
                      <img src="/actionlogo.png" alt="Action Wave" className="w-full h-full object-contain" />
                    </div>
                  </SheetTitle>
                </SheetHeader>

                {/* Navigation Links - Horizontal on larger mobile, vertical on small */}
                <nav className="flex flex-wrap gap-2 mb-4">
                  <SheetClose asChild>
                    <Link to="/" className="flex-1 min-w-[45%] flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                      <Waves className="h-4 w-4 text-primary" />
                      Protocol
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/dashboard" className="flex-1 min-w-[45%] flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                      <Search className="h-4 w-4 text-primary" />
                      Dashboard
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/create-circle" className="flex-1 min-w-[45%] flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                      <Badge variant="outline" className="h-4 w-4 p-0 flex items-center justify-center rounded-full border-primary text-primary text-xs">+</Badge>
                      Create
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/profile" className="flex-1 min-w-[45%] flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                      <div className="h-4 w-4 rounded-full border border-primary" />
                      Profile
                    </Link>
                  </SheetClose>
                </nav>

                {/* Wallet Button */}
                <WalletButton className="w-full justify-center" />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

const WalletButton = ({ className }: { className?: string }) => {
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
            className={`rounded-full bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 font-semibold px-6 transition-all ${className}`}
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
      className={`rounded-full bg-white text-black hover:bg-white/90 font-semibold px-6 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] ${className}`}
    >
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}

export default Header;
