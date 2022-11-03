import { useQuery } from 'react-query';

import { useZnsSdk } from './useZnsSdk';

export const useBidData = (domainId: string) => {
	const sdk = useZnsSdk();

	const query = useQuery(
		['domain', 'bids', { domainId }],
		() => sdk.zauction.listBids(domainId),
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: Boolean(domainId),
		},
	);

	return {
		...query,
		isLoading: query.isLoading || query.isIdle,
	};
};
