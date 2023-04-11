import { useQuery } from 'react-query';

import { useZnsSdk } from './useZnsSdk';
import { DomainSortOptions } from '@zero-tech/zns-sdk/lib/api/dataStoreApi/types';

export const useSubdomainDataByIdDeep = (
	domainId: string,
	limit: number,
	sort?: DomainSortOptions,
) => {
	const sdk = useZnsSdk();

	return useQuery(
		['domain', 'subdomains', 'deep', { domainId }],
		async () => sdk.getSubdomainsByIdDeep(domainId, limit, 0, sort),

		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: Boolean(domainId),
		},
	);
};
