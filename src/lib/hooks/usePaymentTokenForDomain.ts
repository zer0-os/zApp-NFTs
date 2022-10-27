import { useQuery } from 'react-query';

import { useZnsSdk } from './useZnsSdk';

export const usePaymentTokenForDomain = (domainId: string) => {
	const sdk = useZnsSdk();

	return useQuery(
		['domain', 'token', { domainId }],
		() => sdk.zauction.getPaymentTokenForDomain(domainId),
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	);
};
