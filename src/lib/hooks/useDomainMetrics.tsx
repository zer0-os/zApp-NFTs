//- React Imports
import { useState } from 'react';
import { useQuery } from 'react-query';

//- Hooks Imports
import { useZnsSdk } from './useZnsSdk';

//- Library Imports
import { DomainMetrics } from '@zero-tech/zns-sdk/lib/types';

export interface UseDomainMetricsReturn {
	domainMetrics: DomainMetrics | undefined;
	error: any;
	isError: boolean;
	isLoading: boolean;
	isSuccess: boolean;
}

export const useDomainMetrics = (domainId: string): UseDomainMetricsReturn => {
	// SDK
	const sdk = useZnsSdk();

	// State
	const [domainMetrics, setDomainMetrics] = useState<
		DomainMetrics | undefined
	>();

	// Query
	const { error, isError, isLoading, isSuccess } = useQuery(
		`domain-metrics-${domainId}`,
		async () => {
			try {
				const metricsData = await sdk.getDomainMetrics([domainId]);
				setDomainMetrics(metricsData[domainId]);
			} catch (error: any) {
				throw new Error(error);
			}
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
