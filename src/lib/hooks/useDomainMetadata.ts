import { useQuery } from 'react-query';

import { parseDomainMetadata } from '../util/metadata/metadata';

import { useZnsSdk } from './useZnsSdk';

export const useDomainMetadata = (uri: string) => {
	const sdk = useZnsSdk();

	return useQuery(
		['domain-metadata', uri],
		async () => {
			const raw = await sdk.utility.getMetadataFromUri(uri);

			if (raw) {
				return parseDomainMetadata(raw);
			}
		},
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: Boolean(uri),
		},
	);
};
