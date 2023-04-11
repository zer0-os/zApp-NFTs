import { useQuery } from 'react-query';

import { useZnsSdk } from './useZnsSdk';
import { DomainSortOptions } from '@zero-tech/zns-sdk/lib/api/dataStoreApi/types';

export const useSubdomainDataById = (
	domainId: string,
	limit: number,
	sort?: DomainSortOptions,
) => {
	const sdk = useZnsSdk();

	return useQuery(
		['domain', 'subdomains', { domainId }],
		() => sdk.getSubdomainsById(domainId, true, limit, 0, sort),
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	);
};
