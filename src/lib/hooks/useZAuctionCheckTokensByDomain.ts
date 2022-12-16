import { useQuery } from 'react-query';

import { useZnsSdk } from './useZnsSdk';
import { BigNumber } from 'ethers';

export const useZAuctionCheckTokensByDomain = (
	account: string,
	domainId: string,
	buyNowPrice: BigNumber,
) => {
	const sdk = useZnsSdk();

	return useQuery(
		['user', 'approval', 'z-auction', 'buy-now', { account, buyNowPrice }],
		async () =>
			await sdk.zauction.needsToApproveZAuctionToSpendTokensByDomain(
				account,
				domainId,
				buyNowPrice,
			),
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: Boolean(domainId && account && buyNowPrice),
		},
	);
};
