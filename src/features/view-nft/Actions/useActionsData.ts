import {
	getUserBids,
	getDomainId,
	getParentZna,
	sortBidsByAmount,
} from '../../../lib/util';

import {
	useWeb3,
	useDomainData,
	useBuyNowListing,
	useBidData,
	useDomainMetadata,
	usePaymentToken,
} from '../../../lib/hooks';

export const useActionsData = (zna: string) => {
	const domainId = getDomainId(zna);
	const parentZna = getParentZna(zna);

	const { account } = useWeb3();
	const { data: allBids, isLoading: isLoadingBids } = useBidData(domainId);
	const { data: domain, isLoading: isLoadingDomain } = useDomainData(domainId);

	const { data: metadata, isLoading: isLoadingMetadata } =
		useDomainMetadata(domainId);

	const { data: paymentToken, isLoading: isLoadingPaymentToken } =
		usePaymentToken(parentZna);

	const { data: buyNowListingData, isLoading: isLoadingBuyNowListing } =
		useBuyNowListing(domainId);

	const { sortedBids, highestBid } = sortBidsByAmount(allBids);
	const { userBids, highestUserBid } = getUserBids(account, sortedBids);

	const buyNowPrice = buyNowListingData?.price;
	const paymentTokenLabel = paymentToken?.label ?? '';

	const isOwnedByUser = domain?.owner?.toLowerCase() === account?.toLowerCase();
	const isDomainBiddable = !isOwnedByUser || Boolean(metadata?.isBiddable);
	const isBuyNow = buyNowPrice && !isOwnedByUser && Boolean(domain?.name);
	const isSetBuyNow = isOwnedByUser && Boolean(domain?.name);
	const isViewBids = isDomainBiddable && allBids?.length > 0;
	const isUserBid = !isOwnedByUser && userBids?.length > 0;

	const isLoading =
		isLoadingBids ||
		isLoadingDomain ||
		isLoadingMetadata ||
		isLoadingPaymentToken ||
		isLoadingBuyNowListing;

	return {
		highestBid,
		highestUserBid,
		buyNowPrice,
		paymentTokenLabel,
		isDomainBiddable,
		isOwnedByUser,
		isSetBuyNow,
		isUserBid,
		isBuyNow,
		isViewBids,
		isLoading,
	};
};
