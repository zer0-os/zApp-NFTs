import { useQuery } from 'react-query';

import { useZnsSdk } from './useZnsSdk';

export const useDomainData = (domainId: string) => {
	const sdk = useZnsSdk();

	return useQuery(
		['domain', domainId],
		async () => await sdk.getDomainById(domainId),
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	);
};
