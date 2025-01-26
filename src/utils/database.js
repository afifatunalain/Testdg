import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Initialize Firebase (make sure to set up your Firebase config)
const firebaseConfig = {
  // Your Firebase configuration object
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveLotteryResult = async (result) => {
  try {
    const docRef = await addDoc(collection(db, "lotteryResults"), {
      id: result.id,
      winner: result.winner,
      totalPrizePool: result.totalPrizePool,
      participantsCount: result.participants.length,
      endTime: result.endTime,
      timestamp: new Date()
    });
    console.log("Lottery result saved with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving lottery result: ", error);
    throw error;
  }
};
