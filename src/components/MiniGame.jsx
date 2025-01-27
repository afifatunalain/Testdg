import React, { useState, useEffect, useContext } from 'react';
import { WalletContext } from '../contexts/WalletContext';
import { checkNFTOwnership, enterLottery } from '../utils/solana';
import { addParticipant, endLotterySession, createNewLotterySession } from '../utils/lottery';

const MiniGame = () => {
  const { publicKey, connection } = useContext(WalletContext);
  const [hasNFT, setHasNFT] = useState(false);
  const [lotteryResult, setLotteryResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkNFTStatus = async () => {
      if (publicKey) {
        try {
          const ownsNFT = await checkNFTOwnership(publicKey, connection);
          setHasNFT(ownsNFT);
        } catch (error) {
          console.error("Error checking NFT status:", error);
          setHasNFT(false);
        }
      }
    };
    checkNFTStatus();
  }, [publicKey, connection]);

  const handleEnterLottery = async () => {
    if (!hasNFT || !publicKey) {
      alert("You need an Early Access NFT to participate in the lottery.");
      return;
    }

    setIsLoading(true);
    try {
      await enterLottery(publicKey, connection);
      await addParticipant(publicKey, 50000);
      alert("You have successfully entered the lottery!");
      waitForLotteryResult();
    } catch (error) {
      console.error("Error entering lottery:", error);
      alert("Failed to enter lottery. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const waitForLotteryResult = async () => {
    setTimeout(async () => {
      try {
        const result = await endLotterySession();
        setLotteryResult(result);
        await createNewLotterySession();
      } catch (error) {
        console.error("Error processing lottery result:", error);
      }
    }, 60000);
  };

  return (
    <div className="mini-game-container">
      <h2>Mini Game - Lottery</h2>
      {!hasNFT ? (
        <p className="warning-text">You need an Early Access NFT to participate in the lottery.</p>
      ) : (
        <div className="lottery-controls">
          <p>Entry fee: 50,000 Pumpfun</p>
          <button 
            onClick={handleEnterLottery} 
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Enter Lottery'}
          </button>
        </div>
      )}
      {lotteryResult && (
        <div className="lottery-result">
          <h3>Lottery Result</h3>
          <p>{lotteryResult.winner === publicKey ? 'You won!' : 'Better luck next time!'}</p>
        </div>
      )}
    </div>
  );
};

export default MiniGame;
