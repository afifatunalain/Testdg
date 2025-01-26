let currentLotterySession = null;

export const createNewLotterySession = () => {
  currentLotterySession = {
    id: Date.now(),
    participants: [],
    totalPrizePool: 0,
    winner: null,
    endTime: Date.now() + 3600000 // 1 hour from now
  };
};

export const addParticipant = (publicKey, amount) => {
  if (!currentLotterySession) createNewLotterySession();
  currentLotterySession.participants.push({ publicKey, amount });
  currentLotterySession.totalPrizePool += amount;
};

export const endLotterySession = async () => {
  if (!currentLotterySession || currentLotterySession.participants.length === 0) return null;

  const winnerIndex = Math.floor(Math.random() * currentLotterySession.participants.length);
  const winner = currentLotterySession.participants[winnerIndex];
  
  currentLotterySession.winner = winner.publicKey;

  // Implement prize distribution logic here
  // Transfer 99% of prize pool to winner
  // Transfer 1% to developer wallet

  return currentLotterySession;
};
