import React, { useContext } from 'react';
import { WalletContext } from '../contexts/WalletContext';

const LandingPage = () => {
  const { publicKey, connectWallet, disconnectWallet } = useContext(WalletContext);

  return (
    <div className="landing-page">
      <h1>Welcome to Solana Lottery</h1>
      {!publicKey ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected: {publicKey}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
