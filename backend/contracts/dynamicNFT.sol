// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ZedTalkTickets is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    uint private MAX_SUPPLY=1000;

    constructor() ERC721("SuperseedDynamic", "SSD") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://bafkreibubrwti7pi7feo6eby32tfhjkynfmkxqsw24wnqh3ae2qx3jpd5y";
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId<MAX_SUPPLY, "All tokens have been minted!");
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function numTokensMinted()
    public
    onlyOwner
    view
    returns(uint)
    {
        return _tokenIdCounter.current();
    }
    
}
