import { useQuery } from 'react-query';

import { useZnsSdk } from './useZnsSdk';
import { Bid } from '@zero-tech/zauction-sdk';

export const useZAuctionCheckByBid = (account: string, bid: Bid) => {
	const sdk = useZnsSdk();

	return useQuery(
		['user', 'approval', 'z-auction', 'bid', { account, bid }],
		async () =>
			await sdk.zauction.needsToApproveZAuctionToTransferNftsByBid(
				account,
				bid,
			),
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: Boolean(account && bid),
		},
	);
};
