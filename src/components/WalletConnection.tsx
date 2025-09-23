import { Wallet, Copy, ExternalLink } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface WalletConnectionProps {
  className?: string;
}

export const WalletConnection = ({ className }: WalletConnectionProps) => {
  const { address, isConnected, isConnecting, connectWallet, disconnectWallet, error } = useWallet();
  const { toast } = useToast();

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className="flex items-center gap-2 bg-card border border-primary/20 rounded-lg px-4 py-2 shadow-card">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-mono text-muted-foreground">
            {formatAddress(address)}
          </span>
          <EnhancedButton
            variant="ghost"
            size="icon"
            onClick={copyAddress}
            className="h-6 w-6"
          >
            <Copy className="h-3 w-3" />
          </EnhancedButton>
          <EnhancedButton
            variant="ghost"
            size="icon"
            onClick={() => window.open(`https://etherscan.io/address/${address}`, '_blank')}
            className="h-6 w-6"
          >
            <ExternalLink className="h-3 w-3" />
          </EnhancedButton>
        </div>
        <EnhancedButton
          variant="outline"
          size="sm"
          onClick={disconnectWallet}
        >
          Disconnect
        </EnhancedButton>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <EnhancedButton
        variant="gradient"
        onClick={connectWallet}
        disabled={isConnecting}
        className="gap-2"
      >
        <Wallet className="h-4 w-4" />
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </EnhancedButton>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};