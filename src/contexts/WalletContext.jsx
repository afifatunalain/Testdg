import React, { createContext, useState, useCallback } from 'react';
import { Connection } from '@solana/web3.js';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [publicKey, setPublicKey] = useState(null);
  const [connection] = useState(
    new Connection(process.env.REACT_APP_SOLANA_NETWORK, 'confirmed')
  );

  const connectWallet = useCallback(async () => {
    try {
      const { solana } = window;
      if (!solana?.isPhantom) {
        window.open('https://phantom.app/', '_blank');
        throw new Error("Please install Phantom wallet");
      }

      const response = await solana.connect();
      setPublicKey(response.publicKey.toString());
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert(error.message);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    const { solana } = window;
    if (solana) {
      solana.disconnect();
      setPublicKey(null);
    }
  }, []);

  return (
    <WalletContext.Provider value={{ 
      publicKey, 
      connection,
      connectWallet, 
      disconnectWallet 
    }}>
      {children}
    </WalletContext.Provider>
  );
};
