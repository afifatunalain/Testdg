import React, { useState, useEffect, useContext } from 'react';
import { WalletContext } from '../contexts/WalletContext';
import { checkNFTOwnership, enterLottery } from '../utils/solana';
import { addParticipant, endLotterySession, createNewLotterySession } from '../utils/lottery';

const MiniGame = () => {
  const { publicKey } = useContext(WalletContext);
  const [hasNFT, setHasNFT] = useState(false);
  const [lotteryResult, setLotteryResult] = useState(null);

  useEffect(() => {
    if (publicKey) {
      checkNFTStatus();
    }
  }, [publicKey]);

  const checkNFTStatus = async () => {
    const ownsNFT = await checkNFTOwnership(publicKey);
    setHasNFT(ownsNFT);
  };

  const handleEnterLottery = async () => {
    if (hasNFT && publicKey) {
      try {
        await enterLottery(publicKey);
        addParticipant(publicKey, 50000);
        alert("You have successfully entered the lottery!");
        waitForLotteryResult();
      } catch (error) {
        console.error("Error entering lottery:", error);
      }
    } else {
      alert("You need an Early Access NFT to participate in the lottery.");
    }
  };

  const waitForLotteryResult = async () => {
    setTimeout(async () => {
      const result = await endLotterySession();
      setLotteryResult(result);
      createNewLotterySession();
    }, 60000);
  };

  return (
    <div>
      <h2>Mini Game - Lottery</h2>
      {!hasNFT ? (
        <p>You need an Early Access NFT to participate in the lottery.</p>
      ) : (
        <div>
          <p>Entry fee: 50,000 Pumpfun</p>
          <button onClick={handleEnterLottery}>Enter Lottery</button>
        </div>
      )}
      {lotteryResult && (
        <div>
          <h3>Lottery Result</h3>
          <p>{lotteryResult.winner === publicKey ? 'You won!' : 'Better luck next time!'}</p>
        </div>
      )}
    </div>
  );
};

export default MiniGame;
