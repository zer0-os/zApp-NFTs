import { getDomainId, getParentZna } from '../../lib/util';
import { useDomainData } from '../../lib/hooks/useDomainData';
import { usePaymentToken } from '../../lib/hooks/usePaymentToken';
import { useDomainMetrics } from '../../lib/hooks/useDomainMetrics';
import { useDomainMetadata } from '../../lib/hooks/useDomainMetadata';

export const useAcceptBidData = (zna: string) => {
	const domainId = getDomainId(zna);
	const parentZna = getParentZna(zna);

	const { data: domain, isLoading: isLoadingDomain } = useDomainData(domainId);
	const { data: metrics, isLoading: isLoadingMetrics } =
		useDomainMetrics(domainId);
	const { data: metadata, isLoading: isLoadingMetadata } =
		useDomainMetadata(domainId);
	const { data: paymentToken } = usePaymentToken(parentZna);

	const title = metadata?.title;
	const creator = domain?.minter;
	const highestBid = metrics?.highestBid;
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
		isLoadingMetrics,
		isLoadingMetadata,
	};
};
