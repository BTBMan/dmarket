// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {NFT} from "../src/NFT.sol";

contract NFTScript is Script {
    function setUp() public {}

    function run() public returns (NFT nft) {
        vm.startBroadcast();

        nft = new NFT();

        vm.stopBroadcast();
    }
}
