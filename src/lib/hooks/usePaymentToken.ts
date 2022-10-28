import { getDomainId } from '../util/domains/domains';
import { usePaymentTokenForDomain } from './usePaymentTokenForDomain';
import { usePaymentTokenInfo } from './usePaymentTokenInfo';

export const usePaymentToken = (zna: string) => {
	const domainId = getDomainId(zna);

	const { data: paymentToken, isLoading: isLoadingPaymentToken } =
		usePaymentTokenForDomain(domainId);
	const { data: paymentTokenInfo, isLoading: isLoadingPaymentTokenInfo } =
		usePaymentTokenInfo(paymentToken);

	const isLoading = isLoadingPaymentToken || isLoadingPaymentTokenInfo;

	return {
		data: !isLoading && {
			tokenId: paymentToken,
			...paymentTokenInfo,
		},
		isLoading,
	};
};
