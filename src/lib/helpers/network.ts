import { Network, DEFAULT_NETWORK, NETWORK_TYPES } from '../constants/networks';

export const chainIdToNetworkType = (chainId?: Network): NETWORK_TYPES => {
	if (!chainId) {
		chainId = DEFAULT_NETWORK;
	}
	switch (chainId) {
		case 1:
			return NETWORK_TYPES.MAINNET;
		case 4:
			return NETWORK_TYPES.RINKEBY;
		default:
			return NETWORK_TYPES.LOCAL;
	}
};
