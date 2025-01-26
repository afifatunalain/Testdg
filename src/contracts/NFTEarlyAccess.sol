// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTEarlyAccess is ERC721, Ownable {
    uint public totalSupply;
    string public baseTokenURI;
    bool public mintEnabled;
    
    constructor() ERC721("NFT Early Access", "NEA") {
        mintEnabled = true;
    }

    function mint() external {
        require(mintEnabled, "Minting is disabled");
        require(totalSupply < type(uint).max, "Max supply reached");
        
        totalSupply++;
        _mint(msg.sender, totalSupply);
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
}
