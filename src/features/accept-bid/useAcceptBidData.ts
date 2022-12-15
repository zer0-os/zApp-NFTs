import { getDomainId, getParentZna, sortBidsByAmount } from '../../lib/util';
import {
	useBidData,
	useDomainData,
	usePaymentToken,
	useDomainMetadata,
} from '../../lib/hooks';

export const useAcceptBidData = (zna: string) => {
	const domainId = getDomainId(zna);
	const parentZna = getParentZna(zna);

	const { data: domain, isLoading: isLoadingDomain } = useDomainData(domainId);

	const { data: metadata, isLoading: isLoadingMetadata } =
		useDomainMetadata(domainId);

	const { data: paymentToken } = usePaymentToken(parentZna);

	const { data: bids, isLoading: isLoadingBidData } = useBidData(domainId);
	const { highestBid } = sortBidsByAmount(bids);

	const title = metadata?.title;
	const creator = domain?.minter;
	const isMetadataLocked = domain?.isLocked ? 'Locked' : 'Unlocked';
	const imageSrc = metadata?.previewImage ?? metadata?.image;
	const imageAlt = `${metadata?.title ?? 'loading'} nft image`;
	const paymentTokenSymbol = paymentToken?.symbol ?? '';
	const paymentTokenId = paymentToken?.id ?? '';

	return {
		domainId,
		title,
		creator,
		imageSrc,
		imageAlt,
		highestBid,
		isMetadataLocked,
		paymentTokenSymbol,
		paymentTokenId,
		isLoadingDomain,
		isLoadingBidData,
		isLoadingMetadata,
	};
};
