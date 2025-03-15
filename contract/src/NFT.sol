// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/* Imports *******/
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
/* Events ********/

/* Errors ********/

/* Interfaces ****/

/* Libraries *****/

/**
 * @title NFT
 * @author BTBMan
 * @notice This is a NFT contract
 */
contract NFT is ERC721URIStorage {
    ////////////////////////////////////
    // Type declarations              //
    ////////////////////////////////////

    ////////////////////////////////////
    // State variables                //
    ////////////////////////////////////
    uint256 private s_tokenIds;
    address private s_nftMarketContract;

    ////////////////////////////////////
    // Events                         //
    ////////////////////////////////////

    ////////////////////////////////////
    // Errors                         //
    ////////////////////////////////////

    ////////////////////////////////////
    // Modifiers                      //
    ////////////////////////////////////

    constructor(address nftMarketContract) ERC721("Awesome NFT", "AN") {
        s_nftMarketContract = nftMarketContract;
    }

    ////////////////////////////////////
    // Receive & Fallback             //
    ////////////////////////////////////

    ////////////////////////////////////
    // Functions                      //
    ////////////////////////////////////
    function mintNFT(string memory tokenURI) public returns (uint256) {
        _mint(msg.sender, s_tokenIds);
        _setTokenURI(s_tokenIds, tokenURI);
        setApprovalForAll(s_nftMarketContract, true); // Allow NFT Market to manage all of minter's tokens
        s_tokenIds++;
        return s_tokenIds;
    }

    ////////////////////////////////////
    // Getter functions               //
    ////////////////////////////////////
}
