//- React Imports
import { useQuery } from 'react-query';

//- Hooks Imports
import { useZnsSdk } from './useZnsSdk';

//- Library Imports
import { BuyNowListing } from '@zero-tech/zns-sdk/lib/zAuction';

export interface UseBuyNowPriceReturn {
	buyNowPrice: string;
	error: any;
	isError: boolean;
	isLoading: boolean;
	isSuccess: boolean;
}

export const useBuyNowPrice = (domainId: string): UseBuyNowPriceReturn => {
	// SDK
	const sdk = useZnsSdk();

	// Query
	const {
		error,
		isError,
		isLoading,
		isSuccess,
		data: { buyNowPrice } = {},
	} = useQuery(
		`domain-buy-now-price-${domainId}`,
		async () => {
			try {
				const buyNowPrice = await sdk.zauction.getBuyNowPrice(domainId);

				return {
					buyNowPrice,
				};
			} catch (error: any) {
				return {
					buyNowPrice: null,
				};
			}
		},
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	);

	return {
		buyNowPrice,
		error,
		isError,
		isLoading,
		isSuccess,
	};
};
