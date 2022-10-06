import { createContext, FC, ReactNode, useMemo } from 'react';

import { providers } from 'ethers';
import { chainIdToNetworkType } from '../helpers/network';
import * as zns from '@zero-tech/zns-sdk';

import {
	DEFAULT_NETWORK,
	Network,
	NETWORK_CONFIGS,
	NETWORK_TYPES,
} from '../constants/networks';

interface ZnsSdkProviderProps {
	provider?: providers.Web3Provider;
	chainId?: number;
	children: ReactNode;
}

// @TODO: not sure if this is the best way to create default context
export const ZnsSdkContext = createContext(
	zns.createInstance(
		zns.configuration.mainnetConfiguration(
			new providers.JsonRpcProvider(NETWORK_CONFIGS[DEFAULT_NETWORK].rpcUrl),
		),
	),
);

export const ZnsSdkProvider: FC<ZnsSdkProviderProps> = ({
	provider: providerProps,
	chainId,
	children,
}: ZnsSdkProviderProps) => {
	const sdk = useMemo(() => {
		const provider =
			providerProps ??
			new providers.JsonRpcProvider(NETWORK_CONFIGS[DEFAULT_NETWORK].rpcUrl);

		// We know that the chain ID will be a valid network because
		// ChainGate will prevent this provider from rendering if
		// the chain matches an unsupported network
		const network = chainIdToNetworkType(
			provider?._network?.chainId ?? DEFAULT_NETWORK,
		);

		switch (network) {
			case NETWORK_TYPES.MAINNET: {
				return zns.createInstance(
					zns.configuration.mainnetConfiguration(provider),
				);
			}

			case NETWORK_TYPES.RINKEBY: {
				return zns.createInstance(
					zns.configuration.rinkebyConfiguration(provider),
				);
			}

			default: {
				throw new Error('SDK isn´t available for this chainId');
			}
		}
	}, [providerProps, chainId]);

	return (
		<ZnsSdkContext.Provider value={sdk}>{children}</ZnsSdkContext.Provider>
	);
};
