import { Search, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Waves className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">ActionWave</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Protocol
          </Link>
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link to="/create-circle" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Create Circle
          </Link>
          <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Profile
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search protocol..."
              className="w-64 pl-9 bg-secondary border-border text-sm"
            />
          </div>

          {/* Network Status */}
          <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10">
            <span className="mr-1.5 h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            Stellar Mainnet
          </Badge>

          {/* User Avatar */}
          <Link to="/profile">
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
