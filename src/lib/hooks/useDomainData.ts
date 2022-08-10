//- React Imports
import { useQuery } from 'react-query';

//- Hooks Imports
import { useZnsSdk } from './useZnsSdk';

//- Library Imports
import { Domain } from '@zero-tech/zns-sdk/lib/types';

export interface UseDomainReturn {
	domain: Domain;
	error: any;
	isError: boolean;
	isLoading: boolean;
	isSuccess: boolean;
}

export const useDomainData = (domainId: string): UseDomainReturn => {
	// SDK
	const sdk = useZnsSdk();

	// Query
	const {
		error,
		isError,
		isLoading,
		isSuccess,
		data: domain,
	} = useQuery(
		`domain-data-${domainId}`,
		async () => {
			const domain = await sdk.getDomainById(domainId);
			return domain;
		},
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	);

	return {
		domain,
		error,
		isError,
		isLoading,
		isSuccess,
	};
};
