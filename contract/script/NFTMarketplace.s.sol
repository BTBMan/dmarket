// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {NFTMarketplace} from "../src/NFTMarketplace.sol";
import {HelperConfig, IHelperConfig} from "./HelperConfig.s.sol";

contract NFTMarketplaceScript is Script, IHelperConfig {
    function setUp() public {}

    function run() public returns (NFTMarketplace nftMarketplace, HelperConfig helperConfig) {
        helperConfig = new HelperConfig();
        // NetworkConfig memory activeNetworkConfig = helperConfig.getActiveNetworkConfig();

        vm.startBroadcast();

        nftMarketplace = new NFTMarketplace();

        vm.stopBroadcast();

        return (nftMarketplace, helperConfig);
    }
}
