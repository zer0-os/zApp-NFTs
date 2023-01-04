import {
	useBidData,
	useDomainData,
	usePaymentToken,
	useDomainMetadata,
	useBuyNowListing,
} from '../../lib/hooks';
import {
	formatEthers,
	getDomainId,
	getParentZna,
	sortBidsByAmount,
} from '../../lib/util';

export const useSetBuyNowData = (zna: string) => {
	const domainId = getDomainId(zna);
	const parentZna = getParentZna(zna);

	const { data: paymentToken } = usePaymentToken(parentZna);
	const { data: allBids, isLoading: isLoadingBids } = useBidData(domainId);
	const { data: domain, isLoading: isLoadingDomain } = useDomainData(domainId);
	const { highestBid } = sortBidsByAmount(allBids);

	const { data: metadata, isLoading: isLoadingMetadata } =
		useDomainMetadata(domainId);

	const { data: buyNowListingData, isLoading: isLoadingBuyNowListing } =
		useBuyNowListing(domainId);

	const title = metadata?.title;
	const creator = domain?.minter;
	const paymentTokenLabel = paymentToken?.label ?? '';
	const paymentTokenSymbol = paymentToken?.symbol ?? '';
	const buyNowPrice = buyNowListingData?.price;

	const imageAlt = `${metadata?.title ?? 'loading'} nft image`;
	const imageSrc = metadata?.previewImage ?? metadata?.image;

	const isBuyNowSet = Boolean(buyNowPrice);

	const isLoading =
		isLoadingDomain ||
		isLoadingBids ||
		isLoadingMetadata ||
		isLoadingBuyNowListing;

	const buyNowPriceAsString = buyNowPrice
		? `${formatEthers(buyNowPrice?.toString())} ${paymentTokenSymbol}`
		: '-';

	const highestBidAsString = highestBid
		? `${formatEthers(highestBid.amount)} ${paymentTokenSymbol}`
		: '-';

	return {
		title,
		creator,
		domainId,
		imageAlt,
		imageSrc,
		isLoading,
		isBuyNowSet,
		paymentTokenLabel,
		paymentTokenSymbol,
		highestBidAsString,
		buyNowPriceAsString,
	};
};
