import { createContext, FC, ReactNode, useMemo } from 'react';

import { providers } from 'ethers';
import { chainIdToNetworkType } from '../helpers/network';
import * as zsale from '@zero-tech/zsale-sdk';

import {
	DEFAULT_NETWORK,
	NETWORK_CONFIGS,
	NETWORK_TYPES,
} from '../constants/networks';
import { useWeb3 } from '../hooks/useWeb3';

interface ZsaleSdkProviderProps {
	chainId?: number;
	children: ReactNode;
}

// @TODO: optimize the way we create default context with proper types
export const ZsaleSdkContext = createContext({} as any);

export const ZsaleSdkProvider: FC<ZsaleSdkProviderProps> = ({
	chainId,
	children,
}: ZsaleSdkProviderProps) => {
	const { provider: web3Provider } = useWeb3();
	const provider =
		web3Provider ||
		new providers.JsonRpcProvider(NETWORK_CONFIGS[DEFAULT_NETWORK].rpcUrl);

	const sdk = useMemo(() => {
		const network = chainIdToNetworkType(chainId ?? DEFAULT_NETWORK);

		switch (network) {
			case NETWORK_TYPES.MAINNET: {
				return {
					wapesInstance: zsale.createWapeSaleInstance({
						web3Provider,
						publicSalePurchaseLimit: 9,
						contractAddress: '0x82132726A4E757294731FBb1739b0E5957D158bE',
						merkleTreeFileUri:
							'https://res.cloudinary.com/fact0ry/raw/upload/v1670283876/drops/wapes/merkle/wape-sale-mintlist-merkleTree.json',
						advanced: {
							merkleTreeFileIPFSHash:
								'QmdrXFrUwdXAycSwbJNBkRAG7ee8cqNpCqJDShSVWZwgCf',
						},
					}),
					gensInstance: zsale.createGenSaleInstance({
						web3Provider,
						contractAddress: '0x78BC1D081Cb18Bf503B090201b2ef298Dea67F24',
						merkleTreeFileUri:
							'https://res.cloudinary.com/fact0ry/raw/upload/v1679937539/drops/gens/gens-mintlist-merkleTree-fix.json',
						advanced: {
							merkleTreeFileIPFSHash:
								'QmXLtwfnxc8kHUCrf9KDzp9mtgFmM49yq1DRMd79qD5qN4',
						},
					}),
					claimInstance: zsale.createClaimWithChildInstance({
						web3Provider,
						contractAddress: '0xF1c77209aEb972383b03Da16DAb7957AcE183CF5',
						claimingRegistrarAddress:
							'0xc2e9678A71e50E5AEd036e00e9c5caeb1aC5987D',
					}),
				};
			}

			case NETWORK_TYPES.GOERLI: {
				return {
					wapesInstance: zsale.createWapeSaleInstance({
						web3Provider,
						publicSalePurchaseLimit: 9,
						contractAddress: '0xB97Aa9C072dc3b67976dA1CC04E84D26525973BE',
						merkleTreeFileUri:
							'https://res.cloudinary.com/fact0ry/raw/upload/v1671045872/drops/wapes/merkle/modified-dry-run-mintlist-merkleTree.json',
						advanced: {
							merkleTreeFileIPFSHash:
								'Qmc9LFv4SvStGMg7KLDmyoqTzk1t6nMnpAcF5JpsUXkVPy',
						},
					}),
					gensInstance: zsale.createGenSaleInstance({
						web3Provider,
						contractAddress: '0x96d19de086c207ec543f9975b37bc2008284222e',
						merkleTreeFileUri:
							'https://res.cloudinary.com/fact0ry/raw/upload/v1678453970/drops/gens/gens-goerli-dry-run-mintlist-merkleTree.json',
						advanced: {
							merkleTreeFileIPFSHash:
								'QmU2Ut94aBKws5Y9MDmvaMEsJAJDznU2DS2Knz9h4nUqiQ',
						},
					}),

					claimInstance: zsale.createClaimWithChildInstance({
						web3Provider,
						contractAddress: '0x0cda74723a9945977df45268394dff7989e0265b',
						claimingRegistrarAddress:
							'0x06b3fb925b342411fc7420fdc7bd5433f7a7261b',
					}),
				};
			}

			default: {
				throw new Error('SDK isn´t available for this chainId');
			}
		}

	}, [provider, chainId]);

	(global as any).zsale = { ...sdk };

	return (
		<ZsaleSdkContext.Provider value={sdk}>{children}</ZsaleSdkContext.Provider>
	);
};
