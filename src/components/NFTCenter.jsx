import React, { useContext, useState, useEffect } from 'react';
import { WalletContext } from '../contexts/WalletContext';
import { mintEarlyAccessNFT, mintWinnerNFT, checkNFTOwnership } from '../utils/solana';

const NFTCenter = () => {
  const { publicKey } = useContext(WalletContext);
  const [hasEarlyAccessNFT, setHasEarlyAccessNFT] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    if (publicKey) {
      checkNFTStatus();
    }
  }, [publicKey]);

  const checkNFTStatus = async () => {
    const ownsNFT = await checkNFTOwnership(publicKey);
    setHasEarlyAccessNFT(ownsNFT);
  };

  const handleMintEarlyAccess = async () => {
    if (publicKey) {
      await mintEarlyAccessNFT(publicKey);
      await checkNFTStatus();
    }
  };

  const handleMintWinner = async () => {
    if (publicKey && isWinner) {
      await mintWinnerNFT(publicKey);
    }
  };

  return (
    <div>
      <h2>NFT Center</h2>
      {!hasEarlyAccessNFT && (
        <button onClick={handleMintEarlyAccess}>Mint Early Access NFT</button>
      )}
      {isWinner && <button onClick={handleMintWinner}>Mint Winner NFT</button>}
    </div>
  );
};

export default NFTCenter;
