// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTWinner is ERC721, ERC721Enumerable, Ownable, ReentrancyGuard {
        uint public totalSupply;
            uint public constant MAX_SUPPLY = 1000000; // Limited to 1 million
                string public baseTokenURI;
                    bool public mintEnabled;
                        
                            constructor() ERC721("NFT Winner", "NW") {
                                        mintEnabled = true;
                            }

                                function mint(address winner) external onlyOwner nonReentrant {
                                            require(mintEnabled, "Minting is disabled");
                                                    require(totalSupply < MAX_SUPPLY, "Max supply reached");
                                                            require(winner != address(0), "Invalid winner address");
                                                                    
                                                                            totalSupply++;
                                                                                    _mint(winner, totalSupply);
                                }

                                    // Owner functions
                                        function setMintEnabled(bool _enabled) external onlyOwner {
                                                    mintEnabled = _enabled;
                                        }

                                            function setBaseURI(string memory _baseTokenURI) external onlyOwner {
                                                        baseTokenURI = _baseTokenURI;
                                            }

                                                function _baseURI() internal view override returns (string memory) {
                                                            return baseTokenURI;
                                                }

                                                    // View functions
                                                        function tokensOfOwner(address _owner) external view returns(uint256[] memory) {
                                                                    uint256 tokenCount = balanceOf(_owner);
                                                                            uint256[] memory tokensId = new uint256[](tokenCount);

                                                                                    for(uint256 i = 0; i < tokenCount; i++) {
                                                                                                    tokensId[i] = tokenOfOwnerByIndex(_owner, i);
                                                                                    }
                                                                                            
                                                                                                    return tokensId;
                                                        }

                                                            // Required overrides
                                                                function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
                                                                        internal
                                                                                override(ERC721, ERC721Enumerable)
                                                                                    {
                                                                                                super._beforeTokenTransfer(from, to, tokenId, batchSize);
                                                                                    }

                                                                                        function supportsInterface(bytes4 interfaceId)
                                                                                                public
                                                                                                        view
                                                                                                                override(ERC721, ERC721Enumerable)
                                                                                                                        returns (bool)
                                                                                                                            {
                                                                                                                                        return super.supportsInterface(interfaceId);
                                                                                                                            }
}

                                                                                                                            }
                                                                                    }
                                                                                    }
                                                        }
                                                }
                                            }
                                        }
                                }
                            }
}