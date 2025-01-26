import React from 'react';
import { WalletProvider } from './contexts/WalletContext';
import LandingPage from './components/LandingPage';
import MiniGame from './components/MiniGame';
import NFTCenter from './components/NFTCenter';
import BackgroundVideo from './components/BackgroundVideo';
import './BackgroundVideo.css';

function App() {
  return (
      <WalletProvider>
            <div className="App">
                    <BackgroundVideo />
                            <LandingPage />
                                    <MiniGame />
                                            <NFTCenter />
                                                  </div>
                                                      </WalletProvider>
                                                        );
                                                        }

                                                        export default App;
                                                        