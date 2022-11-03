import { useQuery } from 'react-query';

import { useZnsSdk } from './useZnsSdk';
import { bigNumberToLocaleString } from '@zero-tech/zapp-utils/formatting/big-number';

export const useUserTokenBalance = (account: string, paymentToken: string) => {
	const sdk = useZnsSdk();

	const query = useQuery(
		['user', 'balance', { account, paymentToken }],
		async () => {
			const balanceAsBigNumber =
				await sdk.zauction.getUserBalanceForPaymentToken(account, paymentToken);
			return {
				balanceAsBigNumber: balanceAsBigNumber,
				balanceAsString: bigNumberToLocaleString(balanceAsBigNumber, 18),
			};
		},
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: Boolean(paymentToken),
		},
	);

	return {
		...query,
		isLoading: query.isLoading || query.isIdle,
	};
};
