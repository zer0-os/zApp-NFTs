//- React Imports
import { useQuery } from 'react-query';

//- Hooks Imports
import { useZnsSdk } from './useZnsSdk';

//- Library Imports
import { Domain } from '@zero-tech/zns-sdk/lib/types';

export interface UseSubdomainDataReturn {
	subdomainData: Domain[] | undefined;
	error: any;
	isError: boolean;
	isLoading: boolean;
	isSuccess: boolean;
}

export const useSubdomainData = (domainId: string): UseSubdomainDataReturn => {
	// SDK
	const sdk = useZnsSdk();

	// Query
	const {
		error,
		isError,
		isLoading,
		isSuccess,
		data: { subdomainData } = {},
	} = useQuery(
		`domain-subdomains-${domainId}`,
		async () => {
			try {
				const subdomainData = await sdk.getSubdomainsById(domainId);

				return { subdomainData };
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
		subdomainData,
		error,
		isError,
		isLoading,
		isSuccess,
	};
};
