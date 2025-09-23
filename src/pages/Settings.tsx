import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Settings as SettingsIcon, User, Shield, Bell } from 'lucide-react';

export default function Settings() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
            <SettingsIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account and preferences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Default Gas Price
                </label>
                <p className="text-sm">Auto (recommended)</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Network
                </label>
                <p className="text-sm">Ethereum Mainnet</p>
              </div>
              <EnhancedButton variant="outline" size="sm">
                Update Preferences
              </EnhancedButton>
            </CardContent>
          </Card>

          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Two-Factor Authentication
                </label>
                <p className="text-sm">Not enabled</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Transaction Confirmation
                </label>
                <p className="text-sm">Always required</p>
              </div>
              <EnhancedButton variant="outline" size="sm">
                Security Settings
              </EnhancedButton>
            </CardContent>
          </Card>

          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Transaction Updates
                </label>
                <p className="text-sm">Email & Browser</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  New Proposals
                </label>
                <p className="text-sm">Email only</p>
              </div>
              <EnhancedButton variant="outline" size="sm">
                Notification Settings
              </EnhancedButton>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}