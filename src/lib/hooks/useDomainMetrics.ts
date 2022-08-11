//- React Imports
import { DomainMetricsCollection } from '@zero-tech/zns-sdk';
import { useQuery } from 'react-query';

//- Hooks Imports
import { useZnsSdk } from './useZnsSdk';

export const useDomainMetrics = (domainId: string) => {
	// SDK
	const sdk = useZnsSdk();

	// Query
	return useQuery(
		`domain-metrics-${domainId}`,
		async () => {
			const domainMetricsCollection: DomainMetricsCollection =
				await sdk.getDomainMetrics([domainId]);
			return domainMetricsCollection[domainId];
		},
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	);
};
