import React, { useContext, useEffect, useState } from 'react';
import { WalletContext } from '../contexts/WalletContext';
import { getBalance } from '../utils/solana';

const LandingPage = () => {
  const { publicKey, connectWallet } = useContext(WalletContext);
    const [balance, setBalance] = useState({ sol: 0, pumpfun: 0 });

      useEffect(() => {
          if (publicKey) {
                fetchBalance();
                    }
                      }, [publicKey]);

                        const fetchBalance = async () => {
                            const balances = await getBalance(publicKey);
                                setBalance(balances);
                                  };

                                    return (
                                        <div>
                                              <h1>Solana Lottery Overview</h1>
                                                    {publicKey ? (
                                                            <div>
                                                                      <p>Connected: {publicKey}</p>
                                                                                <p>SOL Balance: {balance.sol}</p>
                                                                                          <p>Pumpfun Balance: {balance.pumpfun}</p>
                                                                                                  </div>
                                                                                                        ) : (
                                                                                                                <button onClick={connectWallet}>Connect Wallet</button>
                                                                                                                      )}
                                                                                                                          </div>
                                                                                                                            );
                                                                                                                            };

                                                                                                                            export default LandingPage;
                                                                                                                            