//- React Imports
import { useQuery } from 'react-query';

//- Util Imports
import { parseDomainMetadata } from '../util/metadata/metadata';

//- Library Imports
import useZnsSdk from './useZnsSdk';

export const useDomainMetadata = (uri?: string) => {
	// SDK
	const sdk = useZnsSdk();

	// Query
	return useQuery(
		`domain-metadata-${uri}`,
		async () => {
			const raw = uri && (await sdk.utility.getMetadataFromUri(uri));

			if (raw) {
				return parseDomainMetadata(raw);
			}
		},
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	);
};
