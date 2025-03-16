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
    uint256 public constant ITEM_PRICE = 0.01 ether;

    function setUp() public {
        (nftMarketplace, helperConfig) = new NFTMarketplaceScript().run();
        activeNetworkConfig = helperConfig.getActiveNetworkConfig();

        vm.deal(user, STARTING_BALANCE);
    }

    function testMoreThanListingFee() public payable {
        vm.startPrank(user);
        vm.expectRevert(NFTMarketplace.NFTMarketplace__NotEnoughListingFeePaid.selector);
        nftMarketplace.createMarketItem{value: ITEM_PRICE - 0.001 ether}(
            ITEM_PRICE - 0.001 ether, "https://www.google.com"
        );
        vm.stopPrank();
    }

    function testEmitEventAfterCreateMarketItem() public {
        vm.expectEmit(true, false, false, false);
        emit NFTMarketplace.MarketItemCreated({
            tokenId: 0,
            seller: user,
            owner: address(0),
            price: ITEM_PRICE,
            sold: false
        });

        vm.startPrank(user);
        nftMarketplace.createMarketItem{value: ITEM_PRICE}(ITEM_PRICE, "https://www.google.com");
        vm.stopPrank();
    }

    function testMarketplaceOwnedTokenAfterCreateMarketItem() public {
        vm.startPrank(user);
        nftMarketplace.createMarketItem{value: ITEM_PRICE}(ITEM_PRICE, "https://www.google.com");
        vm.stopPrank();

        assertEq(nftMarketplace.ownerOf(0), address(nftMarketplace));
    }

    function testBalanceAfterCreateMarketItem() public {
        vm.startPrank(user);
        nftMarketplace.createMarketItem{value: ITEM_PRICE}(ITEM_PRICE, "https://www.google.com");
        vm.stopPrank();

        assertEq(address(nftMarketplace).balance, ITEM_PRICE);
        assertEq(user.balance, STARTING_BALANCE - ITEM_PRICE);
    }
}
