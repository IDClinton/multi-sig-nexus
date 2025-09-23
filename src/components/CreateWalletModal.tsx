import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreateWalletData } from '@/types/multisig';
import { useToast } from '@/hooks/use-toast';

interface CreateWalletModalProps {
  trigger: React.ReactNode;
  onCreateWallet?: (data: CreateWalletData) => void;
}

export const CreateWalletModal = ({ trigger, onCreateWallet }: CreateWalletModalProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [owners, setOwners] = useState(['']);
  const [requiredSignatures, setRequiredSignatures] = useState<number>(1);
  const { toast } = useToast();

  const addOwner = () => {
    setOwners([...owners, '']);
  };

  const updateOwner = (index: number, value: string) => {
    const newOwners = [...owners];
    newOwners[index] = value;
    setOwners(newOwners);
  };

  const removeOwner = (index: number) => {
    if (owners.length > 1) {
      setOwners(owners.filter((_, i) => i !== index));
      if (requiredSignatures > owners.length - 1) {
        setRequiredSignatures(owners.length - 1);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validOwners = owners.filter(owner => owner.trim() !== '');
    
    if (!name.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a wallet name",
        variant: "destructive"
      });
      return;
    }

    if (validOwners.length < 1) {
      toast({
        title: "Validation Error", 
        description: "Please add at least one owner address",
        variant: "destructive"
      });
      return;
    }

    if (requiredSignatures > validOwners.length) {
      toast({
        title: "Validation Error",
        description: "Required signatures cannot exceed number of owners",
        variant: "destructive"
      });
      return;
    }

    const walletData: CreateWalletData = {
      name: name.trim(),
      owners: validOwners,
      requiredSignatures
    };

    console.log('Creating wallet:', walletData);
    onCreateWallet?.(walletData);
    
    toast({
      title: "Wallet Created",
      description: `Multi-sig wallet "${name}" has been created successfully`,
    });
    
    // Reset form
    setName('');
    setOwners(['']);
    setRequiredSignatures(1);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border shadow-intense">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create Multi-Sig Wallet</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Wallet Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Wallet Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Treasury Wallet"
              className="bg-background border-border focus:border-primary"
            />
          </div>

          {/* Owners */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Owner Addresses</Label>
              <EnhancedButton
                type="button"
                variant="ghost"
                size="sm"
                onClick={addOwner}
                className="gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Owner
              </EnhancedButton>
            </div>
            
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {owners.map((owner, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={owner}
                    onChange={(e) => updateOwner(index, e.target.value)}
                    placeholder="0x..."
                    className="flex-1 bg-background border-border focus:border-primary font-mono text-sm"
                  />
                  {owners.length > 1 && (
                    <EnhancedButton
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeOwner(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </EnhancedButton>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Required Signatures */}
          <div className="space-y-2">
            <Label htmlFor="signatures">Required Signatures</Label>
            <Select 
              value={requiredSignatures.toString()} 
              onValueChange={(value) => setRequiredSignatures(parseInt(value))}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: Math.max(1, owners.filter(o => o.trim()).length) }, (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1} of {owners.filter(o => o.trim()).length}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <EnhancedButton
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </EnhancedButton>
            <EnhancedButton
              type="submit"
              variant="gradient"
              className="flex-1"
            >
              Create Wallet
            </EnhancedButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};