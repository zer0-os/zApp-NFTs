import { useQuery } from 'react-query';

import { useZnsSdk } from './useZnsSdk';

export const useSubdomainData = (domainId: string) => {
	const sdk = useZnsSdk();

	return useQuery(
		['domain-subdomains', domainId],
		async () => await sdk.getSubdomainsById(domainId),
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	);
};
