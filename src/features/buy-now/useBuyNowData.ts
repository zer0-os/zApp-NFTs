import {
	useWeb3,
	useBidData,
	useDomainData,
	usePaymentToken,
	useDomainMetadata,
	useUserTokenBalance,
	useBuyNowListing,
} from '../../lib/hooks';
import {
	getDomainId,
	getParentZna,
	getUserBids,
	sortBidsByAmount,
} from '../../lib/util';
import { bigNumberToLocaleString } from '@zero-tech/zapp-utils/formatting/big-number';

export const useBuyNowData = (zna: string) => {
	const { account } = useWeb3();

	const domainId = getDomainId(zna);
	const parentZna = getParentZna(zna);

	const { data: paymentToken } = usePaymentToken(parentZna);
	const { data: allBids, isLoading: isLoadingBids } = useBidData(domainId);
	const { data: domain, isLoading: isLoadingDomain } = useDomainData(domainId);
	const { sortedBids, highestBid } = sortBidsByAmount(allBids);
	const { highestUserBid } = getUserBids(account, sortedBids);

	const { data: metadata, isLoading: isLoadingMetadata } =
		useDomainMetadata(domainId);

	const { data: tokenBalance, isLoading: isLoadingTokenBalance } =
		useUserTokenBalance(account, paymentToken?.id);

	const { data: buyNowListingData, isLoading: isLoadingBuyNowListing } =
		useBuyNowListing(domainId);

	const buyNowPriceString = buyNowListingData?.price
		? bigNumberToLocaleString(buyNowListingData?.price)
		: '-';

	const title = metadata?.title;
	const creator = domain?.minter;
	const balanceAsString = tokenBalance?.balanceAsString ?? '';
	const imageSrc = metadata?.previewImage ?? metadata?.image;
	const imageAlt = `${metadata?.title ?? 'loading'} nft image`;
	const paymentTokenSymbol = paymentToken?.symbol ?? '';
	const paymentTokenId = paymentToken?.id ?? '';
	const isLeadingBid = highestUserBid?.amount >= highestBid?.amount;

	const isLoading =
		isLoadingDomain ||
		isLoadingBids ||
		isLoadingMetadata ||
		isLoadingTokenBalance;

	return {
		domainId,
		title,
		creator,
		imageSrc,
		imageAlt,
		highestBid,
		allBids,
		highestUserBid,
		isLeadingBid,
		balanceAsString,
		paymentTokenId,
		paymentTokenSymbol,
		isLoading,
		buyNowPriceString,
	};
};
