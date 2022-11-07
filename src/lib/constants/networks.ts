export enum Network {
	MAINNET = 1,
	RINKEBY = 4,
	GOERLI = 5,
}

export enum NETWORK_TYPES {
	MAINNET = 'MAINNET',
	RINKEBY = 'RINKEBY',
	GOERLI = 'GOERLI',
	LOCAL = 'LOCAL',
}

const ENV_NETWORK = process.env.REACT_APP_DEFAULT_NETWORK;
export const DEFAULT_NETWORK = Network.MAINNET;

interface NetworkConfig {
	rpcUrl: string;
}

export const RPC_URLS: { [chainId: number]: string } = {
	1: process.env.REACT_APP_INFURA_URL as string,
	4: (process.env.REACT_APP_INFURA_URL as string).replace('mainnet', 'rinkeby'),
	5: (process.env.REACT_APP_INFURA_URL as string).replace('mainnet', 'goerli'),
};

export const NETWORK_CONFIGS: { [network in Network]: NetworkConfig } = {
	[Network.MAINNET]: {
		rpcUrl: RPC_URLS[1],
	},
	[Network.RINKEBY]: {
		rpcUrl: RPC_URLS[4],
	},
	[Network.GOERLI]: {
		rpcUrl: RPC_URLS[5],
	},
};
