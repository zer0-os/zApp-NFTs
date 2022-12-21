import { useQuery } from 'react-query';

import { useZnsSdk } from './useZnsSdk';

export const useZAuctionCheckByPaymentToken = (
	account: string,
	paymentToken: string,
) => {
	const sdk = useZnsSdk();

	return useQuery(
		[
			'user',
			'approval',
			'z-auction',
			'payment-token',
			{ account, paymentToken },
		],
		async () =>
			await sdk.zauction.needsToApproveZAuctionToSpendTokensByPaymentToken(
				account,
				paymentToken,
				'1000000000',
			),
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: Boolean(account && paymentToken),
		},
	);
};
