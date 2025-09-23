import { useState } from 'react';
import { Plus, Wallet, Shield, Copy, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { CreateWalletModal } from '@/components/CreateWalletModal';
import { useWallet } from '@/hooks/useWallet';
import { mockWallets } from '@/data/mockData';
import { MultiSigWallet, CreateWalletData } from '@/types/multisig';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

export default function MyWallets() {
  const [wallets, setWallets] = useState<MultiSigWallet[]>(mockWallets);
  const { address, isConnected } = useWallet();
  const { toast } = useToast();

  // Filter wallets to show only ones where the current user is an owner
  const myWallets = wallets.filter(wallet => 
    address && wallet.owners.includes(address)
  );

  const handleCreateWallet = (data: CreateWalletData) => {
    // In a real app, this would call the smart contract
    const newWallet: MultiSigWallet = {
      id: (wallets.length + 1).toString(),
      name: data.name,
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      owners: data.owners,
      requiredSignatures: data.requiredSignatures,
      balance: '0.00',
      createdAt: new Date().toISOString(),
    };
    
    setWallets([...wallets, newWallet]);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
            <Wallet className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-muted-foreground mb-6">
            Connect your MetaMask wallet to view your multi-signature wallets.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Wallets</h1>
            <p className="text-muted-foreground">
              Multi-signature wallets where you are an owner
            </p>
            {address && (
              <p className="text-sm text-muted-foreground mt-2">
                Connected as: <span className="font-mono">{formatAddress(address)}</span>
              </p>
            )}
          </div>
          
          <CreateWalletModal 
            trigger={
              <EnhancedButton variant="gradient" size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Create New Wallet
              </EnhancedButton>
            }
            onCreateWallet={handleCreateWallet}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Wallets</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myWallets.length}</div>
              <p className="text-xs text-muted-foreground">
                Wallets where you're an owner
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {myWallets.reduce((sum, wallet) => sum + parseFloat(wallet.balance), 0).toFixed(2)} ETH
              </div>
              <p className="text-xs text-muted-foreground">
                Across your wallets
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Wallets Grid */}
        {myWallets.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {myWallets.map((wallet) => (
              <Link key={wallet.id} to={`/wallet/${wallet.id}`}>
                <Card className="shadow-card hover:shadow-intense transition-all duration-300 border-border/50 hover:border-primary/20 cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center group-hover:bg-gradient-primary transition-all duration-300">
                          <Shield className="h-5 w-5 text-primary group-hover:text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {wallet.name}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            {formatAddress(wallet.address)}
                            <EnhancedButton
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.preventDefault();
                                copyAddress(wallet.address);
                              }}
                            >
                              <Copy className="h-3 w-3" />
                            </EnhancedButton>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Balance */}
                      <div className="text-center py-4 bg-gradient-secondary rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {wallet.balance} ETH
                        </div>
                        <p className="text-sm text-muted-foreground">Current Balance</p>
                      </div>
                      
                      {/* Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Co-owners</p>
                          <p className="font-semibold">{wallet.owners.length}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Required</p>
                          <p className="font-semibold">{wallet.requiredSignatures}/{wallet.owners.length}</p>
                        </div>
                      </div>
                      
                      {/* Your Role Badge */}
                      <div className="flex justify-center">
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/20">
                          <Users className="h-3 w-3 mr-1" />
                          Owner
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">No Multi-Sig Wallets Found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You are not currently an owner of any multi-signature wallets. Create your first wallet or ask to be added as an owner to an existing wallet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CreateWalletModal 
                trigger={
                  <EnhancedButton variant="gradient" size="lg" className="gap-2">
                    <Plus className="h-5 w-5" />
                    Create Your First Wallet
                  </EnhancedButton>
                }
                onCreateWallet={handleCreateWallet}
              />
              <Link to="/dashboard">
                <EnhancedButton variant="outline" size="lg">
                  Browse All Wallets
                </EnhancedButton>
              </Link>
            </div>
            
            <div className="mt-8 p-6 bg-card border border-border/50 rounded-lg max-w-md mx-auto">
              <h4 className="font-semibold mb-2">Getting Started</h4>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li>• Create a new multi-sig wallet</li>
                <li>• Add trusted co-owners</li>
                <li>• Set signature requirements</li>
                <li>• Start secure transactions</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}