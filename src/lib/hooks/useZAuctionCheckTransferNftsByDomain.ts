import { useQuery } from 'react-query';

import { useZnsSdk } from './useZnsSdk';

export const useZAuctionCheckTransferNftsByDomain = (
	domainId: string,
	account: string,
) => {
	const sdk = useZnsSdk();

	return useQuery(
		['z-auction', 'check', 'transfer', 'nfts', { domainId, account }],
		async () =>
			await sdk.zauction.needsToApproveZAuctionToTransferNftsByDomain(
				domainId,
				account,
			),
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: Boolean(domainId && account),
		},
	);
};
