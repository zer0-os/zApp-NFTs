//- React Imports
import { useState } from 'react';
import { useQuery } from 'react-query';

//- Hooks Imports
import { useZnsSdk } from '../useZnsSdk';

//- Library Imports
import { Domain } from '@zero-tech/zns-sdk/lib/types';

export interface UseDomainReturn {
	domain: Domain | undefined;
	error: any;
	isError: boolean;
	isLoading: boolean;
	isSuccess: boolean;
}

export const useDomain = (domainId: string): UseDomainReturn => {
	// SDK
	const sdk = useZnsSdk();

	// State
	const [domain, setDomain] = useState<Domain | undefined>();

	// Query
	const { error, isError, isLoading, isSuccess } = useQuery(
		`domain-${domainId}`,
		async () => {
			try {
				const data = await sdk.getDomainById(domainId);
				setDomain(data);
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
		domain,
		error,
		isError,
		isLoading,
		isSuccess,
	};
};
