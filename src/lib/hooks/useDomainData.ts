import { useQuery } from 'react-query';

import { useZnsSdk } from './useZnsSdk';

export const useDomainData = (domainId: string) => {
	const sdk = useZnsSdk();

	return useQuery(
		['domain', { domainId }],
		() => sdk.getDomainById(domainId, false),
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	);
};
