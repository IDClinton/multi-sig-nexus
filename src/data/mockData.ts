import { MultiSigWallet, Transaction } from '@/types/multisig';

export const mockWallets: MultiSigWallet[] = [
  {
    id: '1',
    name: 'Treasury Wallet',
    address: '0x742d35cc6a13f9a13f3b4c4d5f9a13f3b4c4d5f9',
    owners: [
      '0x1234567890abcdef1234567890abcdef12345678',
      '0xabcdef1234567890abcdef1234567890abcdef12',
      '0x567890abcdef1234567890abcdef1234567890ab'
    ],
    requiredSignatures: 2,
    balance: '15.75',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Development Fund',
    address: '0x8f2a3b5c6d9e1f4a7b8c2e5f3a6b9c1d4e7f8a2b',
    owners: [
      '0x1234567890abcdef1234567890abcdef12345678',
      '0x2468ace0246ace0246ace0246ace0246ace024',
      '0x13579bdf13579bdf13579bdf13579bdf13579bdf'
    ],
    requiredSignatures: 2,
    balance: '8.42',
    createdAt: '2024-02-01T14:20:00Z'
  },
  {
    id: '3',
    name: 'Marketing Budget',
    address: '0x3c5e7f1a2b4d6f8a3c5e7f1a2b4d6f8a3c5e7f1a',
    owners: [
      '0x1234567890abcdef1234567890abcdef12345678',
      '0xfedcba0987654321fedcba0987654321fedcba09'
    ],
    requiredSignatures: 1,
    balance: '22.18',
    createdAt: '2024-02-10T09:15:00Z'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    walletId: '1',
    recipient: '0x9876543210fedcba9876543210fedcba98765432',
    amount: '5.0',
    description: 'Payment for smart contract audit',
    approvals: ['0x1234567890abcdef1234567890abcdef12345678'],
    rejections: [],
    status: 'pending',
    createdAt: '2024-03-15T16:30:00Z',
    proposedBy: '0x1234567890abcdef1234567890abcdef12345678'
  },
  {
    id: '2',
    walletId: '1',
    recipient: '0x1357924681357924681357924681357924681357',
    amount: '2.5',
    description: 'Monthly developer payment',
    approvals: [
      '0x1234567890abcdef1234567890abcdef12345678',
      '0xabcdef1234567890abcdef1234567890abcdef12'
    ],
    rejections: [],
    status: 'approved',
    createdAt: '2024-03-10T11:20:00Z',
    proposedBy: '0xabcdef1234567890abcdef1234567890abcdef12'
  },
  {
    id: '3',
    walletId: '2',
    recipient: '0x2468ace0246ace0246ace0246ace0246ace024',
    amount: '1.0',
    description: 'Bug bounty reward',
    approvals: ['0x1234567890abcdef1234567890abcdef12345678'],
    rejections: [],
    status: 'pending',
    createdAt: '2024-03-12T08:45:00Z',
    proposedBy: '0x1234567890abcdef1234567890abcdef12345678'
  },
  {
    id: '4',
    walletId: '1',
    recipient: '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
    amount: '10.0',
    description: 'Infrastructure costs Q1 2024',
    approvals: [
      '0x1234567890abcdef1234567890abcdef12345678',
      '0xabcdef1234567890abcdef1234567890abcdef12',
      '0x567890abcdef1234567890abcdef1234567890ab'
    ],
    rejections: [],
    status: 'executed',
    createdAt: '2024-02-28T14:10:00Z',
    executedAt: '2024-03-01T10:30:00Z',
    proposedBy: '0x567890abcdef1234567890abcdef1234567890ab'
  }
];