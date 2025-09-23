import { Clock, CheckCircle, XCircle, Send, Users } from 'lucide-react';
import { Transaction } from '@/types/multisig';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TransactionCardProps {
  transaction: Transaction;
  requiredSignatures: number;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onExecute?: (id: string) => void;
  currentUserAddress?: string;
}

export const TransactionCard = ({
  transaction,
  requiredSignatures,
  onApprove,
  onReject,
  onExecute,
  currentUserAddress
}: TransactionCardProps) => {
  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20';
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/20';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/20';
      case 'executed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      case 'executed':
        return <Send className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const hasUserApproved = currentUserAddress && transaction.approvals.includes(currentUserAddress);
  const hasUserRejected = currentUserAddress && transaction.rejections.includes(currentUserAddress);
  const canExecute = transaction.status === 'approved' && transaction.approvals.length >= requiredSignatures;

  return (
    <Card className="shadow-card hover:shadow-intense transition-all duration-300 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={cn("border", getStatusColor(transaction.status))}>
                {getStatusIcon(transaction.status)}
                <span className="ml-1 capitalize">{transaction.status}</span>
              </Badge>
              <span className="text-xs text-muted-foreground">
                #{transaction.id}
              </span>
            </div>
            <h3 className="font-semibold text-lg mb-1 truncate">
              {transaction.description}
            </h3>
            <p className="text-sm text-muted-foreground">
              To: {formatAddress(transaction.recipient)}
            </p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-primary">
              {transaction.amount} ETH
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDate(transaction.createdAt)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Approval Status */}
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            <span className="font-semibold text-primary">{transaction.approvals.length}</span>
            <span className="text-muted-foreground">/{requiredSignatures} signatures</span>
          </span>
          <div className="flex-1 bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-success h-2 rounded-full transition-all duration-300"
              style={{ width: `${(transaction.approvals.length / requiredSignatures) * 100}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        {transaction.status === 'pending' && (
          <div className="flex gap-2">
            {!hasUserApproved && !hasUserRejected && (
              <>
                <EnhancedButton
                  variant="approve"
                  size="sm"
                  onClick={() => onApprove?.(transaction.id)}
                  className="flex-1"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </EnhancedButton>
                <EnhancedButton
                  variant="reject"
                  size="sm"
                  onClick={() => onReject?.(transaction.id)}
                  className="flex-1"
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </EnhancedButton>
              </>
            )}
            {hasUserApproved && (
              <div className="flex-1 text-center text-sm text-green-400 py-2">
                ✓ You have approved this transaction
              </div>
            )}
            {hasUserRejected && (
              <div className="flex-1 text-center text-sm text-red-400 py-2">
                ✗ You have rejected this transaction
              </div>
            )}
          </div>
        )}

        {canExecute && (
          <EnhancedButton
            variant="execute"
            size="sm"
            onClick={() => onExecute?.(transaction.id)}
            className="w-full"
          >
            <Send className="h-4 w-4 mr-2" />
            Execute Transaction
          </EnhancedButton>
        )}

        {transaction.status === 'executed' && transaction.executedAt && (
          <div className="text-center text-sm text-blue-400 py-2">
            ✓ Executed on {formatDate(transaction.executedAt)}
          </div>
        )}
      </CardContent>
    </Card>
  );
};