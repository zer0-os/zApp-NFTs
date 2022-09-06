//- React Imports
import { useQuery } from 'react-query';

//- Hooks Imports
import { useZnsSdk } from './useZnsSdk';

export const usePaymentTokenForDomain = (domainId: string) => {
	const sdk = useZnsSdk();

	return useQuery(
		['domain-payment-token', domainId],
		async () => await sdk.zauction.getPaymentTokenForDomain(domainId),
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	);
};
