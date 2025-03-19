// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/* Imports *******/
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/* Events ********/

/* Errors ********/

/* Interfaces ****/

/* Libraries *****/

/**
 * @title NFTMarketplace
 * @author BTBMan
 * @notice This is a contract for a marketplace for NFTs
 */
contract NFTMarketplace is ERC721URIStorage, IERC721Receiver, ReentrancyGuard, Ownable {
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
    event MarketItemPurchased(uint256 indexed tokenId, address buyer, address seller, uint256 price);

    ////////////////////////////////////
    // Errors                         //
    ////////////////////////////////////
    error NFTMarketplace__IncorrectListingFee();
    error NFTMarketplace__ReceivedFromZeroAddress();
    error NFTMarketplace__MarketItemAlreadySold();
    error NFTMarketplace__MarketItemAlreadyOwned();
    error NFTMarketplace__IncorrectPrice();

    ////////////////////////////////////
    // Modifiers                      //
    ////////////////////////////////////

    modifier correctListingFee() {
        if (msg.value != LISTING_FEE) {
            revert NFTMarketplace__IncorrectListingFee();
        }
        _;
    }

    modifier priceGreaterThanZero(uint256 price) {
        if (price <= 0) {
            revert NFTMarketplace__IncorrectPrice();
        }
        _;
    }

    constructor() Ownable(msg.sender) ERC721("Awesome NFT", "AN") {
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
        return s_tokenIds - 1;
    }

    function createMarketItem(uint256 price, string memory tokenURI)
        external
        payable
        correctListingFee
        priceGreaterThanZero(price)
        nonReentrant
    {
        uint256 tokenId = mintNFT(tokenURI);

        s_marketItems[tokenId] = MarketItem({
            tokenId: tokenId,
            price: price,
            seller: payable(msg.sender),
            owner: payable(address(0)),
            sold: false
        });

        _safeTransfer(msg.sender, address(this), tokenId);

        emit MarketItemCreated({tokenId: tokenId, seller: msg.sender, owner: address(0), price: price, sold: false});
    }

    function purchaseMarketItem(uint256 tokenId) external payable nonReentrant {
        MarketItem memory item = s_marketItems[tokenId];
        address payable seller = item.seller;

        if (item.sold) {
            revert NFTMarketplace__MarketItemAlreadySold();
        }
        if (item.owner != address(0)) {
            revert NFTMarketplace__MarketItemAlreadyOwned();
        }
        if (msg.value != item.price) {
            revert NFTMarketplace__IncorrectPrice();
        }

        item.owner = payable(msg.sender);
        item.seller = payable(address(0));
        item.sold = true;

        s_marketItems[tokenId] = item;

        _safeTransfer(address(this), msg.sender, tokenId);
        seller.transfer(msg.value);

        emit MarketItemPurchased({tokenId: tokenId, buyer: msg.sender, seller: seller, price: item.price});
    }

    function withdraw() external nonReentrant onlyOwner {
        s_owner.transfer(address(this).balance);
    }

    function onERC721Received(address, address from, uint256, bytes calldata) external pure override returns (bytes4) {
        if (from == address(0)) {
            revert NFTMarketplace__ReceivedFromZeroAddress();
        }
        return this.onERC721Received.selector;
    }

    ////////////////////////////////////
    // Getter functions               //
    ////////////////////////////////////
    function getListingFee() public pure returns (uint256) {
        return LISTING_FEE;
    }

    function getMarketItem(uint256 tokenId) public view returns (MarketItem memory) {
        return s_marketItems[tokenId];
    }

    function getSellingList() public view returns (MarketItem[] memory) {
        MarketItem[] memory sellingList = new MarketItem[](s_tokenIds);

        for (uint256 i = 0; i < s_tokenIds; i++) {
            if (s_marketItems[i].owner == address(0)) {
                sellingList[i] = s_marketItems[i];
            }
        }

        return sellingList;
    }

    function getNFTsByOwner(address owner) public view returns (MarketItem[] memory) {
        MarketItem[] memory ownerNFTs = new MarketItem[](s_tokenIds);

        for (uint256 i = 0; i < s_tokenIds; i++) {
            if (s_marketItems[i].owner == owner) {
                ownerNFTs[i] = s_marketItems[i];
            }
        }

        return ownerNFTs;
    }
}
