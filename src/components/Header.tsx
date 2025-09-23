import { Shield, Menu, ChevronDown } from 'lucide-react';
import { WalletConnection } from '@/components/WalletConnection';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'My Wallets', href: '/my-wallets' },
  { name: 'Settings', href: '/settings' },
];

export const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MultiSig
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <WalletConnection />
            
            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <EnhancedButton variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </EnhancedButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card border-border shadow-intense">
                {navigation.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "cursor-pointer",
                        location.pathname === item.href && "text-primary"
                      )}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Desktop Menu Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <EnhancedButton variant="ghost" className="hidden md:flex gap-1">
                  <Menu className="h-4 w-4" />
                  <ChevronDown className="h-3 w-3" />
                </EnhancedButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card border-border shadow-intense">
                {navigation.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "cursor-pointer",
                        location.pathname === item.href && "text-primary"
                      )}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};