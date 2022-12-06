import {
	getUserBids,
	getDomainId,
	getParentZna,
	sortBidsByAmount,
	formatNumber,
} from '../../../lib/util';
import {
	useWeb3,
	useDomainData,
	useBuyNowListing,
	useBidData,
	useDomainMetadata,
	usePaymentToken,
} from '../../../lib/hooks';
import { ethers } from 'ethers';
import { bigNumberToLocaleString } from '@zero-tech/zapp-utils/formatting/big-number';

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

	const paymentTokenSymbol = paymentToken?.symbol ?? '';

	const highestBidUsdConversionString =
		paymentToken && highestBid
			? `$${formatNumber(
					Number(ethers.utils.formatEther(highestBid?.amount)) *
						Number(paymentToken?.priceInUsd),
			  )}`
			: '-';

	const buyNowPrice = buyNowListingData?.price;
	const buyNowPriceString = buyNowPrice
		? bigNumberToLocaleString(buyNowPrice)
		: '-';

	const buyNowPriceUsdConversionString =
		paymentToken && buyNowPrice
			? `$${formatNumber(
					Number(ethers.utils.formatEther(buyNowPriceString)) *
						Number(paymentToken?.priceInUsd),
			  )}`
			: '-';

	const isOwnedByUser = domain?.owner?.toLowerCase() === account?.toLowerCase();
	const isDomainBiddable = Boolean(metadata?.isBiddable);
	const isBuyNow = buyNowPrice && !isOwnedByUser && Boolean(domain?.name);
	const isSetBuyNow = isOwnedByUser && !buyNowPrice && Boolean(domain?.name);

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
		buyNowPriceString,
		paymentTokenSymbol,
		highestBidUsdConversionString,
		buyNowPriceUsdConversionString,
		isDomainBiddable,
		isOwnedByUser,
		isSetBuyNow,
		isUserBid,
		isBuyNow,
		isViewBids,
		isLoading,
	};
};
