//- React Imports
import { useQuery } from 'react-query';

//- Hooks Imports
import { useZnsSdk } from './useZnsSdk';

//- Library Imports
import { DomainMetrics } from '@zero-tech/zns-sdk/lib/types';

export interface UseDomainMetricsReturn {
	domainMetrics: DomainMetrics;
	error: any;
	isError: boolean;
	isLoading: boolean;
	isSuccess: boolean;
}

export const useDomainMetrics = (domainId: string): UseDomainMetricsReturn => {
	// SDK
	const sdk = useZnsSdk();

	// Query
	const {
		error,
		isError,
		isLoading,
		isSuccess,
		data: domainMetrics,
	} = useQuery(
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

	return {
		domainMetrics,
		error,
		isError,
		isLoading,
		isSuccess,
	};
};
