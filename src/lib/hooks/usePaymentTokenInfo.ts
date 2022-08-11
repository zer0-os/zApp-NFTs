//- React Imports
import { useQuery } from 'react-query';

//- Hooks Imports
import { useZnsSdk } from './useZnsSdk';

export const usePaymentTokenInfo = (token?: string) => {
	// SDK
	const sdk = useZnsSdk();

	// Query
	return useQuery(
		`domain-payment-token-info-${token}`,
		async () => token && (await sdk.zauction.getPaymentTokenInfo(token)),
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	);
};
