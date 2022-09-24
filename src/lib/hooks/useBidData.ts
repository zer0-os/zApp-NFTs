import { useQuery } from 'react-query';

import { useZnsSdk } from './useZnsSdk';

export const useBidData = (domainId: string) => {
	const sdk = useZnsSdk();

	return useQuery(
		['domain-bids', domainId],
		async () => await sdk.zauction.listBids(domainId),
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	);
};
