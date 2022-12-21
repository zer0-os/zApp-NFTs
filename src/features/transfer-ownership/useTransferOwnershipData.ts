import {
	useBidData,
	useDomainData,
	usePaymentToken,
	useDomainMetadata,
} from '../../lib/hooks';
import { getDomainId, getParentZna, sortBidsByAmount } from '../../lib/util';

export const useTransferOwnershipData = (zna: string) => {
	const domainId = getDomainId(zna);
	const parentZna = getParentZna(zna);

	const { data: paymentToken } = usePaymentToken(parentZna);
	const { data: allBids, isLoading: isLoadingBids } = useBidData(domainId);
	const { data: domain, isLoading: isLoadingDomain } = useDomainData(domainId);
	const { highestBid } = sortBidsByAmount(allBids);

	const { data: metadata, isLoading: isLoadingMetadata } =
		useDomainMetadata(domainId);

	const title = metadata?.title;
	const creator = domain?.minter;
	const imageSrc =
		metadata?.animation_url || metadata?.image_full || metadata?.image || '';
	const imageAlt = `${metadata?.title ?? 'loading'} nft image`;
	const paymentTokenSymbol = paymentToken?.symbol ?? '';

	const isLoading = isLoadingDomain || isLoadingBids || isLoadingMetadata;

	return {
		domainId,
		title,
		creator,
		imageSrc,
		imageAlt,
		highestBid,
		allBids,
		paymentTokenSymbol,
		isLoading,
	};
};
