// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {NFTMarketplace} from "../src/NFTMarketplace.sol";
import {NFTMarketplaceScript} from "../script/NFTMarketplace.s.sol";
import {HelperConfig, IHelperConfig} from "../script/HelperConfig.s.sol";

contract NFTMarketplaceTest is Test, IHelperConfig {
    NetworkConfig public activeNetworkConfig;

    NFTMarketplace public nftMarketplace;
    HelperConfig public helperConfig;

    address public user = makeAddr("user");

    uint256 public constant STARTING_BALANCE = 1 ether;
    uint256 public constant ITEM_PRICE = 0.1 ether;

    uint256 public listingFee;

    modifier createMarketItem() {
        vm.startPrank(user);
        nftMarketplace.createMarketItem{value: listingFee}(ITEM_PRICE, "https://www.google.com");
        vm.stopPrank();
        _;
    }

    function setUp() public {
        (nftMarketplace, helperConfig) = new NFTMarketplaceScript().run();
        activeNetworkConfig = helperConfig.getActiveNetworkConfig();
        listingFee = nftMarketplace.getListingFee();

        vm.deal(user, STARTING_BALANCE);
    }

    function testIncorrectListingFeeWhenCreateMarketItem() public payable {
        vm.startPrank(user);
        vm.expectRevert(NFTMarketplace.NFTMarketplace__IncorrectListingFee.selector);
        nftMarketplace.createMarketItem(ITEM_PRICE, "");
        vm.stopPrank();
    }

    function testIncorrectPriceWhenCreateMarketItem() public {
        vm.startPrank(user);
        vm.expectRevert(NFTMarketplace.NFTMarketplace__IncorrectPrice.selector);
        nftMarketplace.createMarketItem{value: listingFee}(0, "");
        vm.stopPrank();
    }

    function testEmitEventAfterSuccessfulCreateMarketItem() public {
        vm.expectEmit(true, false, false, false);
        emit NFTMarketplace.MarketItemCreated({
            tokenId: 0,
            seller: user,
            owner: address(0),
            price: ITEM_PRICE,
            sold: false
        });

        vm.startPrank(user);
        nftMarketplace.createMarketItem{value: listingFee}(ITEM_PRICE, "");
        vm.stopPrank();
    }

    function testMarketplaceOwnedTokenAfterSuccessfulCreateMarketItem() public createMarketItem {
        assertEq(nftMarketplace.ownerOf(0), address(nftMarketplace));
    }

    function testBalanceAfterSuccessfulCreateMarketItem() public createMarketItem {
        assertEq(address(nftMarketplace).balance, listingFee);
        assertEq(user.balance, STARTING_BALANCE - listingFee);
    }

    function testIncorrectPriceWhenPurchaseMarketItem() public createMarketItem {
        vm.startPrank(user);
        vm.expectRevert(NFTMarketplace.NFTMarketplace__IncorrectPrice.selector);
        nftMarketplace.purchaseMarketItem(0);
        vm.stopPrank();
    }

    function testBuyerOwnedTokenAfterSuccessfulPurchaseMarketItem() public createMarketItem {
        vm.startPrank(user);
        nftMarketplace.purchaseMarketItem{value: ITEM_PRICE}(0);
        vm.stopPrank();

        NFTMarketplace.MarketItem memory marketItem = nftMarketplace.getMarketItem(0);

        assertEq(nftMarketplace.ownerOf(0), user);
        assertEq(marketItem.owner, user);
        assertEq(marketItem.sold, true);
        assertEq(marketItem.seller, address(0));
    }
}
