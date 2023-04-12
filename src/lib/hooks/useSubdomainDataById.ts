import { useQuery } from 'react-query';

import { useZnsSdk } from './useZnsSdk';

export const useSubdomainDataById = (domainId: string) => {
	const sdk = useZnsSdk();

	return useQuery(
		['domain', 'subdomains', { domainId }],
		() => sdk.getSubdomainsById(domainId, true, 1, 0),
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	);
};
