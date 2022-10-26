import { createContext, FC, ReactNode, useMemo } from 'react';

import { providers } from 'ethers';
import { chainIdToNetworkType } from '../helpers/network';
import * as zns from '@zero-tech/zns-sdk';

import {
	DEFAULT_NETWORK,
	NETWORK_CONFIGS,
	NETWORK_TYPES,
} from '../constants/networks';
import { useWeb3 } from '../hooks/useWeb3';

interface ZnsSdkProviderProps {
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
	chainId,
	children,
}: ZnsSdkProviderProps) => {
	const { provider } = useWeb3();

	const sdk = useMemo(() => {
		const network = chainIdToNetworkType(
			provider?._network?.chainId ?? DEFAULT_NETWORK,
		);

		switch (network) {
			case NETWORK_TYPES.MAINNET: {
				return zns.createInstance(
					zns.configuration.mainnetConfiguration(provider),
				);
			}

			default: {
				throw new Error('SDK isn´t available for this chainId');
			}
		}
	}, [provider, chainId]);

	return (
		<ZnsSdkContext.Provider value={sdk}>{children}</ZnsSdkContext.Provider>
	);
};
