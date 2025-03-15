// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {NFTMarketplace} from "../src/NFTMarketplace.sol";
import {NFTMarketplaceScript} from "../script/NFTMarketplace.s.sol";
import {HelperConfig, IHelperConfig} from "../script/HelperConfig.s.sol";

contract NFTTest is Test, IHelperConfig {
    NetworkConfig public activeNetworkConfig;

    NFTMarketplace public nftMarketplace;
    HelperConfig public helperConfig;

    address public user = makeAddr("user");

    function setUp() public {
        (nftMarketplace, helperConfig) = new NFTMarketplaceScript().run();
        activeNetworkConfig = helperConfig.getActiveNetworkConfig();
    }

    function test_Abc() public {
        console.log(user);
    }
}
