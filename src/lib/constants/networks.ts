export enum Network {
	MAINNET = 1,
	RINKEBY = 4,
}

export enum NETWORK_TYPES {
	MAINNET = 'MAINNET',
	RINKEBY = 'RINKEBY',
	LOCAL = 'LOCAL',
}

// const ENV_NETWORK = process.env.REACT_APP_DEFAULT_NETWORK;
export const DEFAULT_NETWORK = Network.RINKEBY;

interface NetworkConfig {
	rpcUrl: string;
}

export const RPC_URLS: { [chainId: number]: string } = {
	1: process.env.REACT_APP_INFURA_URL as string,
	4: process.env.REACT_APP_INFURA_URL as string,
};

export const NETWORK_CONFIGS: { [network in Network]: NetworkConfig } = {
	[Network.MAINNET]: {
		rpcUrl: RPC_URLS[1],
	},
	[Network.RINKEBY]: {
		rpcUrl: RPC_URLS[4],
	},
};
