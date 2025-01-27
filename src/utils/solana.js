import { Connection, PublicKey } from '@solana/web3.js';
import { 
  getAssociatedTokenAddress, 
  getAccount, 
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';
import { NFT_EARLY_ACCESS_ADDRESS, NFT_WINNER_ADDRESS, PUMPFUN_TOKEN_ADDRESS } from '../config/contracts';

const connection = new Connection('https://api.mainnet-beta.solana.com');

export const getTokenBalance = async (publicKey, tokenMintAddress) => {
  try {
    const associatedTokenAddress = await getAssociatedTokenAddress(
      new PublicKey(tokenMintAddress),
      new PublicKey(publicKey)
    );
    
    const tokenAccount = await getAccount(
      connection,
      associatedTokenAddress
    );
    
    return tokenAccount.amount;
  } catch (error) {
    console.error('Error getting token balance:', error);
    return 0;
  }
};

export const checkNFTOwnership = async (publicKey) => {
  try {
    const tokenAccount = await getAssociatedTokenAddress(
      new PublicKey(NFT_EARLY_ACCESS_ADDRESS),
      new PublicKey(publicKey)
    );
    const account = await getAccount(connection, tokenAccount);
    return account.amount > 0;
  } catch {
    return false;
  }
};

export const enterLottery = async (publicKey) => {
  try {
    const tokenAccount = await getAssociatedTokenAddress(
      new PublicKey(PUMPFUN_TOKEN_ADDRESS),
      new PublicKey(publicKey)
    );
    // Implement lottery entry logic here
    return true;
  } catch (error) {
    console.error('Error entering lottery:', error);
    throw error;
  }
};

export const getBalance = async (publicKey) => {
  try {
    const solBalance = await connection.getBalance(new PublicKey(publicKey));
    const pumpfunBalance = await getTokenBalance(publicKey, PUMPFUN_TOKEN_ADDRESS);
    return { 
      sol: solBalance / 1e9, 
      pumpfun: pumpfunBalance / 1e9 
    };
  } catch (error) {
    console.error('Error getting balance:', error);
    return { sol: 0, pumpfun: 0 };
  }
};
