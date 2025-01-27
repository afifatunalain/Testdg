import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token';
import { PUMPFUN_TOKEN_ADDRESS } from '../config/contracts';

class LotterySession {
  constructor() {
    this.id = Date.now();
    this.participants = [];
    this.totalPrizePool = 0;
    this.winner = null;
    this.endTime = Date.now() + 3600000; // 1 hour from now
  }
}

let currentLotterySession = null;

export const createNewLotterySession = async () => {
  currentLotterySession = new LotterySession();
  return currentLotterySession;
};

export const addParticipant = async (publicKey, amount) => {
  if (!currentLotterySession) {
    await createNewLotterySession();
  }

  try {
    const participant = {
      publicKey,
      amount,
      timestamp: Date.now()
    };

    currentLotterySession.participants.push(participant);
    currentLotterySession.totalPrizePool += amount;

    return true;
  } catch (error) {
    console.error("Error adding participant:", error);
    throw error;
  }
};

export const endLotterySession = async () => {
  if (!currentLotterySession || currentLotterySession.participants.length === 0) {
    return null;
  }

  try {
    const winnerIndex = Math.floor(Math.random() * currentLotterySession.participants.length);
    const winner = currentLotterySession.participants[winnerIndex];
    
    currentLotterySession.winner = winner.publicKey;
    
    // Calculate prize distribution
    const winnerPrize = Math.floor(currentLotterySession.totalPrizePool * 0.99);
    const developerFee = currentLotterySession.totalPrizePool - winnerPrize;

    // Return session results
    return {
      ...currentLotterySession,
      winnerPrize,
      developerFee
    };
  } catch (error) {
    console.error("Error ending lottery session:", error);
    throw error;
  }
};
