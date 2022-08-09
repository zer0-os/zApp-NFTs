//- React Imports
import { useQuery } from 'react-query';

//- Hooks Imports
import { useZnsSdk } from './useZnsSdk';
import { TokenPriceInfo } from '@zero-tech/zns-sdk';

export interface UsePaymentTokenInfoReturn {
	paymentTokenData: TokenPriceInfo;
	error: any;
	isError: boolean;
	isLoading: boolean;
	isSuccess: boolean;
}

export const usePaymentTokenInfo = (
	domainId: string,
): UsePaymentTokenInfoReturn => {
	// SDK
	const sdk = useZnsSdk();

	// Query
	const {
		error,
		isError,
		isLoading,
		isSuccess,
		data: { paymentTokenData } = {},
	} = useQuery(
		`domain-payment-token-info-${domainId}`,
		async () => {
			try {
				const paymentToken = await sdk.zauction.getPaymentTokenForDomain(
					domainId,
				);

				if (paymentToken) {
					const paymentTokenData = await sdk.zauction.getPaymentTokenInfo(
						paymentToken,
					);
					return { paymentTokenData };
				}
			} catch (error: any) {
				throw new Error(error);
			}
		},
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	);

	return {
		paymentTokenData,
		error,
		isError,
		isLoading,
		isSuccess,
	};
};
