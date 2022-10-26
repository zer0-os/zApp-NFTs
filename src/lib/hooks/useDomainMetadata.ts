import { useQuery } from 'react-query';

import { parseDomainMetadata } from '../util/metadata/metadata';

import { useZnsSdk } from './useZnsSdk';
import { useDomainData } from './useDomainData';

export const useDomainMetadata = (domainId: string) => {
	const sdk = useZnsSdk();

	const { data: domainData } = useDomainData(domainId);

	const metadataUri = domainData?.metadataUri;

	const query = useQuery(
		['domain', 'metadata', { metadataUri }],
		async () => {
			const raw = await sdk.utility.getMetadataFromUri(metadataUri);

			if (raw) {
				return parseDomainMetadata(raw);
			}
		},
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: Boolean(metadataUri),
		},
	);

	return {
		...query,
		isLoading: query.isLoading || query.isIdle,
	};
};
