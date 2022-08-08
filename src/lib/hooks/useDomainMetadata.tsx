//- React Imports
import { useState } from 'react';
import { useQuery } from 'react-query';

//- Types Imports
import { Metadata } from '../types/metadata';

//- Library Imports
import { parseDomainMetadata } from '../util/metadata/metadata';
import useZnsSdk from './useZnsSdk';

export interface UseDomainMetadataReturn {
	domainMetadata: Metadata;
	error: any;
	isError: boolean;
	isLoading: boolean;
	isSuccess: boolean;
}

export const useDomainMetadata = (uri: string): UseDomainMetadataReturn => {
	const sdk = useZnsSdk();

	const [domainMetadata, setDomainMetadata] = useState<Metadata | undefined>();

	// Query
	const { error, isError, isLoading, isSuccess } = useQuery(
		`domain-metadata-${uri}`,
		async () => {
			try {
				const raw = await sdk.utility.getMetadataFromUri(uri);
				if (raw) {
					const parsedData = parseDomainMetadata(raw);
					setDomainMetadata(parsedData);
				}
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
		domainMetadata,
		error,
		isError,
		isLoading,
		isSuccess,
	};
};
