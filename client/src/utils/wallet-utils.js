import { polygon, polygonMumbai, arbitrum,optimismSepolia,mantaSepoliaTestnet,opBNBTestnet,rootstockTestnet } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
const KiiTestnet = {
  id: 123454321,
  testnet: true,
  name: 'Kii Chain Testnet',
  rpcUrls: {
    default: {
      http: ['https://a.sentry.testnet.kiivalidator.com:8645'],
    },
    public: {
      http: ['https://a.sentry.testnet.kiivalidator.com:8645'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Kii Chain Testnet Explorer',
      url: 'https://app.kiichain.io/kiichain',
    },
  },
  nativeCurrency: {
    decimals: 18,
    name: 'KII',
    symbol: 'KII',
  },
};

const { chains, publicClient } = configureChains(
  [KiiTestnet,opBNBTestnet,rootstockTestnet],
  [
    jsonRpcProvider({
      rpc: (chainId) => {
        if (chainId.id == 137) {
          return {
            http: "https://polygon-mainnet.g.alchemy.com/v2/ZLSEk8HyDPO8GF7NmrIZpRxxxKAY1zgr",
            webSocket:
              "wss://polygon-mainnet.g.alchemy.com/v2/ZLSEk8HyDPO8GF7NmrIZpRxxxKAY1zgr",
          };
        } else if (chainId.id == 42161) {
          return {
            http: "https://arb-mainnet.g.alchemy.com/v2/eCm1C8c0ke-nbr-n7sZ9S_UUovDTlTV6",
            webSocket:
              "wss://arb-mainnet.g.alchemy.com/v2/eCm1C8c0ke-nbr-n7sZ9S_UUovDTlTV6",
          };
        } else if (chainId.id == 80001) {
          return {
            http: "https://polygon-mumbai.g.alchemy.com/v2/EaKu789oxhWzYFvzEzOPAkCqIl2CwKj5",
            webSocket:
              "wss://polygon-mumbai.g.alchemy.com/v2/EaKu789oxhWzYFvzEzOPAkCqIl2CwKj5",
          };
        } else if (chainId.id == 11155420) {
          return {
            http: "https://sepolia.optimism.io",
            webSocket:
              "wss://polygon-mumbai.g.alchemy.com/v2/EaKu789oxhWzYFvzEzOPAkCqIl2CwKj5",
          };
        }
        else if (chainId.id == 3441006) {
          return {
            http: "https://pacific-rpc.sepolia-testnet.manta.network/http",
            webSocket:
              "",
          };
        }else if (chainId.id == 5611) {
          return {
            http: "https://opbnb-testnet-rpc.bnbchain.org",
            webSocket:
              "",
          };
        }else if (chainId.id == 31) {
          return {
            http: "https://public-node.testnet.rsk.co",
            webSocket:
              "",
          };
        }else if (chainId.id == 123454321) {
          return {
            http: "https://a.sentry.testnet.kiivalidator.com:8645",
            webSocket:
              "",
          };
        }
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Reels-Fi",
  projectId: "87106bd465234d097b8a51ba585bf799",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { wagmiConfig, chains };
