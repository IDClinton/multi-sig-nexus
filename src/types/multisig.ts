export interface MultiSigWallet {
  id: string;
  name: string;
  address: string;
  owners: string[];
  requiredSignatures: number;
  balance: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  walletId: string;
  recipient: string;
  amount: string;
  description: string;
  approvals: string[];
  rejections: string[];
  status: 'pending' | 'approved' | 'rejected' | 'executed';
  createdAt: string;
  executedAt?: string;
  proposedBy: string;
}

export interface CreateWalletData {
  name: string;
  owners: string[];
  requiredSignatures: number;
}

export interface ProposeTransactionData {
  recipient: string;
  amount: string;
  description: string;
}