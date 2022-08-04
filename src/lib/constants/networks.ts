export enum Network {
  MAINNET = 1,
  RINKEBY = 4,
}

const ENV_NETWORK = process.env.REACT_APP_DEFAULT_NETWORK;
export const DEFAULT_NETWORK = Network.RINKEBY;
// export const DEFAULT_NETWORK: Network = (
//   ENV_NETWORK && typeof ENV_NETWORK === "number" && Network[ENV_NETWORK]
//     ? Network[ENV_NETWORK]
//     : Network.MAINNET
// ) as Network;

interface NetworkConfig {
  rpcUrl: string;
  subgraphUrl: string;
}

export const NETWORK_CONFIGS: { [network in Network]: NetworkConfig } = {
  [Network.MAINNET]: {
    rpcUrl: "https://mainnet.infura.io/v3/77c3d733140f4c12a77699e24cb30c27",
    subgraphUrl: "https://api.thegraph.com/subgraphs/name/zer0-os/zfi",
  },
  [Network.RINKEBY]: {
    rpcUrl: "https://rinkeby.infura.io/v3/fa959ead3761429bafa6995a4b25397e",
    subgraphUrl: "https://api.thegraph.com/subgraphs/name/zer0-os/zfi-rinkeby",
  },
};
