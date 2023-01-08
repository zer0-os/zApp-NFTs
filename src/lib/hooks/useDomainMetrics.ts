import { DomainMetricsCollection } from '@zero-tech/zns-sdk';
import { useQuery } from 'react-query';

import { useZnsSdk } from './useZnsSdk';

export const useDomainMetrics = (domainId: string) => {
	const sdk = useZnsSdk();

	return useQuery(
		['domain', 'metrics', { domainId }],
		async () => {
			const domainMetricsCollection: DomainMetricsCollection =
				await sdk.getDomainMetrics([domainId]);

			return domainMetricsCollection[domainId];
		},
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: Boolean(domainId),
		},
	);
};
