//- React Imports
import { useQuery } from 'react-query';

//- Hooks Imports
import { useZnsSdk } from './useZnsSdk';

export const useBidData = (domainId: string) => {
	// SDK
	const sdk = useZnsSdk();

	// Query
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
