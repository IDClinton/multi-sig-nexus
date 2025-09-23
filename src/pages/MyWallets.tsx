import Dashboard from './Dashboard';

// For now, MyWallets is the same as Dashboard
// In a real app, this might filter to only wallets the user owns vs all wallets they're part of
export default function MyWallets() {
  return <Dashboard />;
}