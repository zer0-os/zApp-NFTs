import { useQuery } from 'react-query';

import { useZnsSdk } from './useZnsSdk';

export const useBuyNowListing = (domainId: string) => {
	const sdk = useZnsSdk();

	return useQuery(
		['domain', 'listing', 'buy-now', { domainId }],
		() => sdk.zauction.getBuyNowListing(domainId),
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: Boolean(domainId),
		},
	);
};
