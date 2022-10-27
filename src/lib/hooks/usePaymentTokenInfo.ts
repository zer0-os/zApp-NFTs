import { useQuery } from 'react-query';

import { useZnsSdk } from './useZnsSdk';

export const usePaymentTokenInfo = (token: string) => {
	const sdk = useZnsSdk();

	const query = useQuery(
		['token', 'info', { token }],
		() => sdk.zauction.getPaymentTokenInfo(token),
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
