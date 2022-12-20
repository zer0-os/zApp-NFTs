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
	formatEthers,
	formatNumber,
	getDomainId,
	getParentZna,
	getUserBids,
	sortBidsByAmount,
} from '../../lib/util';

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

	const title = metadata?.title;
	const creator = domain?.minter;
	const paymentTokenSymbol = paymentToken?.symbol ?? '';
	const paymentTokenId = paymentToken?.id ?? '';
	const buyNowPrice = buyNowListingData?.price;

	const imageAlt = `${metadata?.title ?? 'loading'} nft image`;
	const imageSrc =
		metadata?.animation_url ?? metadata?.previewImage ?? metadata?.image;

	const buyNowPriceAsString = buyNowPrice
		? `${formatEthers(buyNowPrice?.toString())} ${paymentTokenSymbol}`
		: '-';

	const balanceAsString = tokenBalance?.balanceAsString
		? `${formatNumber(tokenBalance?.balanceAsString)} ${paymentTokenSymbol}`
		: '-';

	const highestBidAsString = highestBid
		? `${formatEthers(highestBid.amount)} ${paymentTokenSymbol}`
		: '-';

	const isLoading =
		isLoadingDomain ||
		isLoadingBids ||
		isLoadingMetadata ||
		isLoadingTokenBalance ||
		isLoadingBuyNowListing;

	return {
		domainId,
		title,
		creator,
		imageSrc,
		imageAlt,
		highestBid,
		allBids,
		highestUserBid,
		buyNowPriceAsString,
		balanceAsString,
		highestBidAsString,
		paymentTokenId,
		paymentTokenSymbol,
		isLoading,
		buyNowPrice,
	};
};
