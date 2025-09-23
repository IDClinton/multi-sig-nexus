import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Send, Clock, CheckCircle, Users, Copy, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TransactionCard } from '@/components/TransactionCard';
import { useWallet } from '@/hooks/useWallet';
import { mockWallets, mockTransactions } from '@/data/mockData';
import { ProposeTransactionData, Transaction } from '@/types/multisig';
import { useToast } from '@/hooks/use-toast';

export default function WalletDetail() {
  const { id } = useParams<{ id: string }>();
  const { address } = useWallet();
  const { toast } = useToast();
  
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const wallet = mockWallets.find(w => w.id === id);
  
  const walletTransactions = transactions.filter(tx => tx.walletId === id);
  const pendingTransactions = walletTransactions.filter(tx => tx.status === 'pending');
  const completedTransactions = walletTransactions.filter(tx => tx.status === 'executed');

  const handleProposeTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient || !amount || !description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const newTransaction: Transaction = {
      id: (transactions.length + 1).toString(),
      walletId: id!,
      recipient,
      amount,
      description,
      approvals: [address!],
      rejections: [],
      status: 'pending',
      createdAt: new Date().toISOString(),
      proposedBy: address!
    };

    console.log('Proposing transaction:', newTransaction);
    setTransactions([...transactions, newTransaction]);
    
    toast({
      title: "Transaction Proposed",
      description: "Your transaction has been submitted for approval",
    });
    
    // Reset form
    setRecipient('');
    setAmount('');
    setDescription('');
  };

  const handleApprove = (transactionId: string) => {
    console.log('Approving transaction:', transactionId);
    
    setTransactions(prev => prev.map(tx => {
      if (tx.id === transactionId && address && !tx.approvals.includes(address)) {
        const newApprovals = [...tx.approvals, address];
        const newStatus = newApprovals.length >= wallet!.requiredSignatures ? 'approved' : 'pending';
        
        toast({
          title: "Transaction Approved",
          description: `You have approved transaction #${transactionId}`,
        });
        
        return { ...tx, approvals: newApprovals, status: newStatus };
      }
      return tx;
    }));
  };

  const handleReject = (transactionId: string) => {
    console.log('Rejecting transaction:', transactionId);
    
    setTransactions(prev => prev.map(tx => {
      if (tx.id === transactionId && address && !tx.rejections.includes(address)) {
        const newRejections = [...tx.rejections, address];
        
        toast({
          title: "Transaction Rejected",
          description: `You have rejected transaction #${transactionId}`,
          variant: "destructive"
        });
        
        return { ...tx, rejections: newRejections, status: 'rejected' };
      }
      return tx;
    }));
  };

  const handleExecute = (transactionId: string) => {
    console.log('Executing transaction:', transactionId);
    
    setTransactions(prev => prev.map(tx => {
      if (tx.id === transactionId) {
        toast({
          title: "Transaction Executed",
          description: `Transaction #${transactionId} has been executed successfully`,
        });
        
        return { 
          ...tx, 
          status: 'executed', 
          executedAt: new Date().toISOString() 
        };
      }
      return tx;
    }));
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied",
      description: "Address copied to clipboard",
    });
  };

  if (!wallet) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Wallet Not Found</h1>
          <Link to="/dashboard">
            <EnhancedButton variant="gradient">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </EnhancedButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/dashboard">
            <EnhancedButton variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </EnhancedButton>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{wallet.name}</h1>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground font-mono text-sm">
                {formatAddress(wallet.address)}
              </span>
              <EnhancedButton
                variant="ghost"
                size="icon"
                onClick={() => copyAddress(wallet.address)}
                className="h-6 w-6"
              >
                <Copy className="h-3 w-3" />
              </EnhancedButton>
              <EnhancedButton
                variant="ghost"
                size="icon"
                onClick={() => window.open(`https://etherscan.io/address/${wallet.address}`, '_blank')}
                className="h-6 w-6"
              >
                <ExternalLink className="h-3 w-3" />
              </EnhancedButton>
            </div>
          </div>
        </div>

        {/* Wallet Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{wallet.balance} ETH</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Owners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{wallet.owners.length}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {wallet.owners.map((owner, i) => (
                  <div key={i}>{formatAddress(owner)}</div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Required Signatures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{wallet.requiredSignatures}/{wallet.owners.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Propose Transaction */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Propose Transaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProposeTransaction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Address</Label>
                  <Input
                    id="recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="0x..."
                    className="font-mono text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (ETH)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Purpose of this transaction..."
                    rows={3}
                  />
                </div>
                
                <EnhancedButton
                  type="submit"
                  variant="gradient"
                  className="w-full gap-2"
                >
                  <Send className="h-4 w-4" />
                  Propose Transaction
                </EnhancedButton>
              </form>
            </CardContent>
          </Card>

          {/* Transactions */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pending" className="gap-2">
                  <Clock className="h-4 w-4" />
                  Pending ({pendingTransactions.length})
                </TabsTrigger>
                <TabsTrigger value="completed" className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Completed ({completedTransactions.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending" className="space-y-4 mt-6">
                {pendingTransactions.length > 0 ? (
                  pendingTransactions.map((transaction) => (
                    <TransactionCard
                      key={transaction.id}
                      transaction={transaction}
                      requiredSignatures={wallet.requiredSignatures}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onExecute={handleExecute}
                      currentUserAddress={address}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Pending Transactions</h3>
                    <p className="text-muted-foreground">
                      All transactions have been processed or none have been proposed yet.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="completed" className="space-y-4 mt-6">
                {completedTransactions.length > 0 ? (
                  completedTransactions.map((transaction) => (
                    <TransactionCard
                      key={transaction.id}
                      transaction={transaction}
                      requiredSignatures={wallet.requiredSignatures}
                      currentUserAddress={address}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Completed Transactions</h3>
                    <p className="text-muted-foreground">
                      Executed transactions will appear here.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}