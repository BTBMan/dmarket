// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/* Imports *******/
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/* Events ********/

/* Errors ********/

/* Interfaces ****/

/* Libraries *****/

/**
 * @title NFTMarketplace
 * @author BTBMan
 * @notice This is a contract for a marketplace for NFTs
 */
contract NFTMarketplace is ERC721URIStorage, ReentrancyGuard {
    ////////////////////////////////////
    // Type declarations              //
    ////////////////////////////////////
    struct MarketItem {
        uint256 tokenId;
        uint256 price;
        address payable seller;
        address payable owner;
        bool sold;
    }

    ////////////////////////////////////
    // State variables                //
    ////////////////////////////////////
    uint256 private constant LISTING_FEE = 0.01 ether;

    address payable private s_owner;
    uint256 private s_tokenIds;
    mapping(uint256 tokenId => MarketItem marketItem) private s_marketItems;

    ////////////////////////////////////
    // Events                         //
    ////////////////////////////////////
    event MarketItemCreated(uint256 indexed tokenId, address seller, address owner, uint256 price, bool sold);

    ////////////////////////////////////
    // Errors                         //
    ////////////////////////////////////
    error NFTMarketplace__NotEnoughListingFeePaid();

    ////////////////////////////////////
    // Modifiers                      //
    ////////////////////////////////////
    modifier moreThanListingFee(uint256 price) {
        if (price < LISTING_FEE) {
            revert NFTMarketplace__NotEnoughListingFeePaid();
        }
        _;
    }

    constructor() ERC721("Awesome NFT", "AN") {
        s_owner = payable(msg.sender);
    }

    ////////////////////////////////////
    // Receive & Fallback             //
    ////////////////////////////////////

    ////////////////////////////////////
    // Functions                      //
    ////////////////////////////////////
    function mintNFT(string memory tokenURI) private returns (uint256) {
        _safeMint(msg.sender, s_tokenIds);
        _setTokenURI(s_tokenIds, tokenURI);
        s_tokenIds++;
        return s_tokenIds;
    }

    function createMarketItem(uint256 price, string memory tokenURI)
        external
        payable
        moreThanListingFee(price)
        nonReentrant
    {
        uint256 tokenId = mintNFT(tokenURI);

        s_marketItems[tokenId] = MarketItem(tokenId, price, payable(msg.sender), payable(address(0)), false);

        _safeTransfer(msg.sender, address(this), tokenId);

        emit MarketItemCreated(tokenId, msg.sender, address(0), price, false);
    }

    ////////////////////////////////////
    // Getter functions               //
    ////////////////////////////////////
}
