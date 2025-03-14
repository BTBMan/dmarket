-include .env
-include .env.local

# Constants #########################################################
NFT_SCRIPT := script/NFT.s.sol:NFTScript
NFT_MARKET_SCRIPT := script/NFTMarket.s.sol:NFTMarketScript

NETWORK_ARGS :=

# Conditions #######################################################
# E.g: make xxx network=local
ifeq ($(findstring local,$(network)),local)
	NETWORK_ARGS := --rpc-url $(LOCAL_RPC_URL) --private-key $(LOCAL_PRIVATE_KEY) --broadcast -vvvv
endif

# E.g: make xxx network=sepolia
ifeq ($(findstring sepolia,$(network)),sepolia)
	NETWORK_ARGS := --rpc-url $(SEPOLIA_RPC_URL) --private-key $(TEST_PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvv
endif

# Aliases ###########################################################
build:; forge build

deploy-nft:; @forge script $(NFT_SCRIPT) $(NETWORK_ARGS)
deploy-nft-market:; @forge script $(NFT_MARKET_SCRIPT) $(NETWORK_ARGS)

test:; @forge test