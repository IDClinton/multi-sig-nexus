import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WalletConnection } from "@/components/WalletConnection";
import { Shield, Users, Eye, Globe, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  MultiSig Pro
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                <a href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  GitHub
                </a>
              </div>
            </div>
            <WalletConnection />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Secure Your Crypto with Multi-Signature Wallets
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Manage your funds safely with multiple approvals before every transaction. 
              Perfect for teams, DAOs, and security-conscious individuals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WalletConnection className="text-lg px-8 py-4" />
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Multi-Signature Wallets?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enhanced security and collaboration features for modern crypto management
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center shadow-glow hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>🔒 Enhanced Security</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Funds are protected by multiple signers, eliminating single points of failure
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-glow hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>👥 Team Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Perfect for teams and DAOs to manage funds together with shared control
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-glow hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>⚡ Full Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Every transaction is logged and verifiable on the blockchain
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-glow hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>🌍 Multi-chain Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Future-proof design ready for multiple blockchain networks
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple 3-step process to secure your crypto assets
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Multi-Sig Wallet</h3>
              <p className="text-muted-foreground">
                Set up a wallet with multiple owners and define the required number of signatures
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Propose & Approve</h3>
              <p className="text-muted-foreground">
                Any owner can propose transactions, which require approval from other owners
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Execute Safely</h3>
              <p className="text-muted-foreground">
                Transactions execute only when enough owners have signed off on them
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See It In Action</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Clean, intuitive interface designed for professional crypto management
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-2xl">
              <div className="bg-gradient-primary p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="bg-background/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Multi-Sig Wallet Dashboard</h3>
                    <div className="text-sm text-white/80">Connected: 0x1234...5678</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-background/20 rounded-lg p-4">
                      <h4 className="font-medium text-white mb-2">Team Treasury</h4>
                      <p className="text-white/80 text-sm">3/5 signatures required</p>
                      <p className="text-white text-lg font-bold">15.4 ETH</p>
                    </div>
                    <div className="bg-background/20 rounded-lg p-4">
                      <h4 className="font-medium text-white mb-2">Pending Transactions</h4>
                      <p className="text-white/80 text-sm">2 awaiting approval</p>
                      <p className="text-white text-lg font-bold">2/3 signed</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Securing Your Funds Today
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust their crypto assets to multi-signature security
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WalletConnection className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4" />
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  MultiSig Pro
                </span>
              </div>
              <p className="text-muted-foreground mb-4">
                Professional multi-signature wallet interface for secure crypto management.
              </p>
              <p className="text-sm text-muted-foreground">
                Built with ❤️ using Solidity & React
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                <Link to="/dashboard" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                <Link to="/my-wallets" className="block text-muted-foreground hover:text-foreground transition-colors">
                  My Wallets
                </Link>
                <Link to="/settings" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Settings
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <div className="space-y-2">
                <a href="https://github.com" className="block text-muted-foreground hover:text-foreground transition-colors">
                  GitHub
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/40 mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 MultiSig Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;