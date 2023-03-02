import { useCallback, useEffect } from 'react';
import { InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query';

import { useZnsSdk } from '../../../lib/hooks';
import { getDomainId } from '../../../lib/util';
import { DomainSortOptions } from '@zero-tech/zns-sdk/lib/api/dataStoreApi/types';

/**
 * Number of results to show per page.
 * This is currently hardcoded, but could be made configurable in the future.
 * Ideally different device types would have a different number of results
 * per page for optimal performance.
 */
const DEFAULT_RESULTS_PER_PAGE = 24;

const DEFAULT_SORT_OPTIONS: DomainSortOptions = {
	name: 'asc',
};

export const getInfiniteSubdomainQueryKey = (parentDomainId: string) => {
	return ['subdomains', { parentDomainId }];
};

/**
 * Handles incrementally loading subdomains for a given domains.
 * Leverages react-query's useInfiniteQuery hook to handle pagination.
 * @param zna The domain to load subdomains for
 */
export const useInfiniteSubdomains = (zna: string) => {
	const sdk = useZnsSdk();

	const parentDomainId = getDomainId(zna);
	const queryClient = useQueryClient();

	// Assigning queryKey here as it's used in multiple places
	const queryKey = getInfiniteSubdomainQueryKey(parentDomainId);

	/**
	 * Fetches the next page of subdomains from the data store
	 */
	const fetchSubdomains = useCallback(
		async ({ pageParam = 0 }) => {
			// Number of results already loaded, used to determine where to start the next query
			const currentIndex = pageParam * DEFAULT_RESULTS_PER_PAGE;

			return await sdk.getSubdomainsById(
				parentDomainId,
				true,
				DEFAULT_RESULTS_PER_PAGE,
				currentIndex,
				DEFAULT_SORT_OPTIONS,
			);
		},
		[parentDomainId, sdk],
	);

	// Note: assigning query to variable so we can destructure it in hook return
	const query = useInfiniteQuery({
		queryKey,
		queryFn: fetchSubdomains,
		getNextPageParam: (lastPage, pages) => {
			// Doesn't look like the API supports a way to determine if there are more results
			// so we just check if the last page is full, and if so assume there are more
			const hasMore = lastPage.length >= DEFAULT_RESULTS_PER_PAGE;
			return hasMore ? pages.length : undefined;
		},
		keepPreviousData: false,
		refetchOnWindowFocus: false,
	});

	/**
	 * Resets cached value to only contain the first page to reduce memory
	 * usage, and improve performance when navigating back to an already
	 * loaded domain
	 */
	useEffect(() => {
		return () => {
			queryClient.setQueryData(queryKey, (data: InfiniteData<any>) => {
				if (data) {
					// Set the data to only contain the first page
					return {
						pages: data.pages.slice(0, 1),
						pageParams: data.pageParams.slice(0, 1),
					};
				}
			});
		};
	}, [parentDomainId]);

	return {
		...query,
		loadedSubdomains: query.data,
	};
};
