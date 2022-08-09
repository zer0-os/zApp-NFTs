//- React Imports
import { useQuery } from 'react-query';

//- Types Imports
import { Metadata } from '../types/metadata';

//- Util Imports
import { parseDomainMetadata } from '../util/metadata/metadata';

//- Library Imports
import useZnsSdk from './useZnsSdk';

export interface UseDomainMetadataReturn {
	domainMetadata?: Metadata | undefined;
	error: any;
	isError: boolean;
	isLoading: boolean;
	isSuccess: boolean;
}

export const useDomainMetadata = (uri: string): UseDomainMetadataReturn => {
	// SDK
	const sdk = useZnsSdk();

	// Query
	const {
		error,
		isError,
		isLoading,
		isSuccess,
		data: { domainMetadata } = {},
	} = useQuery(
		`domain-metadata-${uri}`,
		async () => {
			try {
				const raw = await sdk.utility.getMetadataFromUri(uri);

				if (raw) {
					const domainMetadata = parseDomainMetadata(raw);
					return { domainMetadata };
				}
			} catch (error) {
				return { domainMetadata: undefined };
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
