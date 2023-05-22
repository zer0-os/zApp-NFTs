import { useQuery } from 'react-query';
import { useZsaleSdk } from '../../../lib/hooks';

import {
	ClaimSaleConfig,
	GenSaleConfig,
	WapeSaleConfig,
} from '@zero-tech/zsale-sdk';

///////////
// Types //
///////////

interface Drop {
	type: 'wape' | 'gen' | 'claim';
}

interface WapeDrop extends Drop, Omit<WapeSaleConfig, 'web3Provider'> {
	type: 'wape';
}

interface GenDrop extends Drop, Omit<GenSaleConfig, 'web3Provider'> {
	type: 'gen';
}

interface ClaimDrop extends Drop, Omit<ClaimSaleConfig, 'web3Provider'> {
	type: 'claim';
}

type DropInstance = WapeDrop | GenDrop | ClaimDrop;

const DEFAULT_REFRESH_INTERVAL = 1000 * 60 * (1 / 6); // 1 minute

/////////////
// useDrop //
/////////////

type UseDropParams = DropInstance & {
	refreshInterval?: number;
};

export const useDrop = ({
	refreshInterval = DEFAULT_REFRESH_INTERVAL,
	...rest
}: UseDropParams) => {
	const drop = useZsaleSdk({ dropInstance: rest as any });

	const contractAddress = rest.contractAddress;

	return useQuery(
		['drop', { contractAddress }],
		async () => {
			return await drop.getSaleData();
		},
		{
			enabled: Boolean(drop),
			cacheTime: refreshInterval,
			refetchOnWindowFocus: false,
		},
	);
};
