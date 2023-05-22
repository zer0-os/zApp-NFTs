import { createContext, FC, ReactNode, useCallback } from 'react';

import { providers } from 'ethers';
import * as zsale from '@zero-tech/zsale-sdk';
import {
	ClaimSaleConfig,
	GenSaleConfig,
	WapeSaleConfig,
} from '@zero-tech/zsale-sdk';

import { DEFAULT_NETWORK, NETWORK_CONFIGS } from '../constants/networks';
import { useWeb3 } from '../hooks/useWeb3';

interface ZsaleSdkProviderProps {
	children: ReactNode;
}

interface Drop {
	type: 'wape' | 'gen' | 'claim';
}

export interface WapeDrop extends Drop, Omit<WapeSaleConfig, 'web3Provider'> {
	type: 'wape';
}

export interface GenDrop extends Drop, Omit<GenSaleConfig, 'web3Provider'> {
	type: 'gen';
}

export interface ClaimDrop extends Drop, Omit<ClaimSaleConfig, 'web3Provider'> {
	type: 'claim';
}

export type DropInstance = WapeDrop | GenDrop | ClaimDrop;

// @TODO: optimize the way we create default context with proper types
export const ZsaleSdkContext = createContext({} as any);

export const ZsaleSdkProvider: FC<ZsaleSdkProviderProps> = ({
	children,
}: ZsaleSdkProviderProps) => {
	const { provider: web3Provider, chainId } = useWeb3();
	const provider =
		web3Provider ||
		new providers.JsonRpcProvider(NETWORK_CONFIGS[DEFAULT_NETWORK].rpcUrl);

	const getSdk = useCallback(
		(dropParameters: DropInstance) => {
			if (!dropParameters) {
				return;
			}
			const { type } = dropParameters;

			let instanceFunction;
			switch (type) {
				case 'wape':
					instanceFunction = zsale.createWapeSaleInstance;
					break;
				case 'gen':
					instanceFunction = zsale.createGenSaleInstance;
					break;
				case 'claim':
					instanceFunction = zsale.createClaimWithChildInstance;
					break;
			}

			return instanceFunction({
				web3Provider: provider,
				...Object.fromEntries(
					Object.entries(dropParameters).filter(([key]) => key !== 'type'),
				),
			});
		},
		[provider, chainId],
	);

	return (
		<ZsaleSdkContext.Provider value={{ getSdk }}>
			{children}
		</ZsaleSdkContext.Provider>
	);
};
