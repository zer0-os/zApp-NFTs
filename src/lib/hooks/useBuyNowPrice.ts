//- React Imports
import { useQuery } from 'react-query';

//- Hooks Imports
import { useZnsSdk } from './useZnsSdk';

export const useBuyNowPrice = (domainId: string) => {
	const sdk = useZnsSdk();

	return useQuery(
		['domain-buy-now-price', domainId],
		async () => await sdk.zauction.getBuyNowPrice(domainId),
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: Boolean(domainId),
		},
	);
};
