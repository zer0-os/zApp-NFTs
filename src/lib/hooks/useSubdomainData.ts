//- React Imports
import { useState } from 'react';
import { useQuery } from 'react-query';

//- Hooks Imports
import { useZnsSdk } from './useZnsSdk';

//- Library Imports
import { Domain } from '@zero-tech/zns-sdk/lib/types';

export interface useSubdomainDataReturn {
	subdomainData: Domain[] | undefined;
	error: any;
	isError: boolean;
	isLoading: boolean;
	isSuccess: boolean;
}

export const useSubdomainData = (domainId: string): useSubdomainDataReturn => {
	// SDK
	const sdk = useZnsSdk();

	// State
	const [subdomainData, setSubdomainData] = useState<Domain[] | undefined>();

	// Query
	const { error, isError, isLoading, isSuccess } = useQuery(
		`domain-subdomains-${domainId}`,
		async () => {
			try {
				const subdomains = await sdk.getSubdomainsById(domainId);
				setSubdomainData(subdomains);
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
