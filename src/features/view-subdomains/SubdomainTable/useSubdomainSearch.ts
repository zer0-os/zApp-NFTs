import { useZnsSdk } from '../../../lib/hooks';
import { useQuery } from 'react-query';
import { getDomainId } from '../../../lib/util';

import { useDebounce } from '@zero-tech/zui';

/**
 * Note: only searches for an exact match
 */
export const useSubdomainSearch = (parentZna: string, queryString: string) => {
	const sdk = useZnsSdk();

	const debouncedQuery = useDebounce(queryString);

	const activeQuery = debouncedQuery
		? `${parentZna}.${debouncedQuery}`
		: undefined;

	const query = useQuery(
		['search', 'subdomains', { parentZna, query: activeQuery }],
		async () => {
			const id = getDomainId(parentZna + '.' + queryString);
			return await sdk.getDomainById(id);
		},
		{
			enabled: !!activeQuery && !!parentZna,
			refetchOnWindowFocus: false,
		},
	);

	return {
		...query,
		activeQuery,
		searchResult: query.data,
		isSearching: query.isLoading,
	};
};
