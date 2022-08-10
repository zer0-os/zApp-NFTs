//- React Imports
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
			const domainMetrics = await sdk.getDomainMetrics([domainId]);
			return domainMetrics[domainId];
		},
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	);
};
