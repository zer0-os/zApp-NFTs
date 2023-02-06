import { useQuery } from 'react-query';

import { useWeb3 } from './useWeb3';
import { useZnsSdk } from './useZnsSdk';

export const useIsDomainMetadataLocked = (domainId: string) => {
	const sdk = useZnsSdk();
	const { provider } = useWeb3();

	const query = useQuery(
		['metadata', 'locked', { domainId }],
		() => sdk.isDomainMetadataLocked(domainId, provider.getSigner()),
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: Boolean(domainId),
		},
	);

	return {
		...query,
		isLoading: query.isLoading || query.isIdle,
	};
};
