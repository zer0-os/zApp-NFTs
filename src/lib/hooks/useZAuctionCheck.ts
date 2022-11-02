import { useQuery } from 'react-query';

import { useZnsSdk } from './useZnsSdk';

export const useZAuctionCheck = (account: string, paymentToken: string) => {
	const sdk = useZnsSdk();

	return useQuery(
		['check-zauction', { account, paymentToken }],
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
