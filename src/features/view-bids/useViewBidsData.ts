import { getDomainId } from '../../lib/util';
import { useBidData, useDomainData, usePaymentToken } from '../../lib/hooks';

export const useViewBidsData = (zna: string) => {
	const domainId = getDomainId(zna);

	const { data: bids, isLoading: isLoadingBids } = useBidData(domainId);
	const { data: domain } = useDomainData(domainId);
	const { data: paymentToken } = usePaymentToken(zna);

	const owner = domain?.owner;
	const paymentTokenSymbol = paymentToken?.symbol ?? '';

	return {
		bids,
		isLoadingBids,
		owner,
		paymentTokenSymbol,
	};
};
