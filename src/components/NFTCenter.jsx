import React, { useContext, useState, useEffect } from 'react';
import { WalletContext } from '../contexts/WalletContext';
import { getBalance } from '../utils/solana';

const NFTCenter = () => {
  const { publicKey } = useContext(WalletContext);
  const [balance, setBalance] = useState({ sol: 0, pumpfun: 0 });

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        const balanceInfo = await getBalance(publicKey);
        setBalance(balanceInfo);
      }
    };
    fetchBalance();
  }, [publicKey]);

  return (
    <div className="nft-center">
      <h2>NFT Center</h2>
      {publicKey && (
        <div>
          <p>SOL Balance: {balance.sol}</p>
          <p>PumpFun Balance: {balance.pumpfun}</p>
        </div>
      )}
    </div>
  );
};

export default NFTCenter;
