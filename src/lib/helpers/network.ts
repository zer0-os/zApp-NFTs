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

export const getEtherscanUri = (networkType: NETWORK_TYPES): string => {
	let prefix = '';
	// TODO: add goerli network when available
	// switch (networkType) {
	// 	case NETWORK_TYPES.GOERLI:
	// 		prefix = 'goerli.';
	// 		break;
	// }
	const uri = `https://${prefix}etherscan.io/`;

	return uri;
};
