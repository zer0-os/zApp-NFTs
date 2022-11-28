import { useQuery } from 'react-query';

import { useZnsSdk } from './useZnsSdk';
import * as ZContracts from '@zero-tech/zero-contracts';

export const usePaymentTokenInfo = (token: string) => {
	const sdk = useZnsSdk();
	const { goerli } = ZContracts.zer0ProtocolAddresses;

	const query = useQuery(
		['token', 'info', { token }],
		() => {
			if (
				token.toLowerCase() === goerli?.tokens?.wildToken?.toLowerCase()
			) {
				return Promise.resolve({
					id: token,
					name: 'Wilder',
					symbol: 'WILD',
					priceInUsd: '0.185',
					decimals: '18',
				});
			} else if (
				token.toLowerCase() === goerli?.tokens?.zeroToken?.toLowerCase()
			) {
				return Promise.resolve({
					id: token,
					name: 'Zer0',
					symbol: 'ZERO',
					priceInUsd: '0.032',
					decimals: '18',
				});
			} else if (
				token.toLowerCase() === goerli?.tokens?.lootToken?.toLowerCase()
			) {
				return Promise.resolve({
					id: token,
					name: 'Loot',
					symbol: 'LOOT',
					priceInUsd: '0.022',
					decimals: '18',
				});
			} else {
				return sdk.zauction.getPaymentTokenInfo(token);
			}
		},
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: Boolean(token),
		},
	);

	return {
		...query,
		isLoading: query.isLoading || query.isIdle,
	};
};
