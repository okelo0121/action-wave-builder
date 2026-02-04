import { Waves, Twitter, Github, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-24 w-24 transition-transform group-hover:scale-105">
                <img src="/actionlogo.png" alt="Action Wave" className="w-full h-full object-contain" />
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The digital backbone bringing the $4 trillion Islamic finance market onchain, serving governments, institutions, and Muslims through DeFi.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="h-8 w-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 hover:text-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 hover:text-primary transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 hover:text-primary transition-colors">
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Protocol */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Protocol</h4>
            <ul className="space-y-2">
              {['Documentation', 'Smart Contracts', 'Audit Reports', 'Governance'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-primary/0 hover:bg-primary transition-colors"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Network */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Network</h4>
            <ul className="space-y-2">
              {['Stellar Explorer', 'Network Status', 'Gas Tracker'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Community</h4>
            <ul className="space-y-2">
              {['Discord', 'Twitter', 'GitHub', 'Blog'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 ActionWave Protocol. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
