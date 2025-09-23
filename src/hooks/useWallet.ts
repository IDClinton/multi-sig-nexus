import { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    error: null,
  });

  const connectWallet = async () => {
    if (!window.ethereum) {
      setWallet(prev => ({ ...prev, error: 'MetaMask not found. Please install MetaMask.' }));
      return;
    }

    setWallet(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts.length > 0) {
        setWallet({
          address: accounts[0],
          isConnected: true,
          isConnecting: false,
          error: null,
        });
      }
    } catch (error: any) {
      setWallet({
        address: null,
        isConnected: false,
        isConnecting: false,
        error: error.message || 'Failed to connect wallet',
      });
    }
  };

  const disconnectWallet = () => {
    setWallet({
      address: null,
      isConnected: false,
      isConnecting: false,
      error: null,
    });
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new BrowserProvider(window.ethereum);
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            setWallet(prev => ({
              ...prev,
              address: accounts[0].address,
              isConnected: true,
            }));
          }
        } catch (error) {
          console.error('Failed to check wallet connection:', error);
        }
      }
    };

    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setWallet(prev => ({
            ...prev,
            address: accounts[0],
            isConnected: true,
            error: null,
          }));
        } else {
          disconnectWallet();
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, []);

  return {
    ...wallet,
    connectWallet,
    disconnectWallet,
  };
};

declare global {
  interface Window {
    ethereum?: any;
  }
}