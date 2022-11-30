import { useDomainMetrics } from '../../lib/hooks/useDomainMetrics';
import { useBuyNowListing } from '../../lib/hooks/useBuyNowListing';
import { useDomainMetadata } from '../../lib/hooks/useDomainMetadata';
import { getDomainId, getParentZna } from '../../lib/util/domains/domains';
import { usePaymentToken } from '../../lib/hooks/usePaymentToken';
import { formatEthers } from '../../lib/util/number/number';

interface UseSubdomainTableItem {
	zna: string;
}

export const useSubdomainTableItem = ({ zna }: UseSubdomainTableItem) => {
	const parentZna = getParentZna(zna);
	const domainId = getDomainId(zna);

	const { data: metrics, isLoading: isLoadingMetrics } =
		useDomainMetrics(domainId);
	const { data: buyNowPrice, isLoading: isLoadingBuyNowPrice } =
		useBuyNowListing(domainId);
	const { data: metadata, isLoading: isLoadingMetadata } =
		useDomainMetadata(domainId);
	const { data: paymentToken } = usePaymentToken(parentZna);

	const image = metadata?.previewImage ?? metadata?.image;
	const alt = (metadata?.name ?? zna) + ' preview image';
	const isLoading = isLoadingMetrics || isLoadingBuyNowPrice;

	const volume = metrics?.volume?.all ? formatEthers(metrics.volume.all) : '-';

	const highestBid = metrics?.highestBid
		? formatEthers(metrics.highestBid)
		: '-';

	return {
		volume,
		highestBid,
		image,
		alt,
		isLoadingMetrics,
		isLoadingMetadata,
		isLoading,
		buyNowPrice,
		metadata,
		paymentTokenLabel: paymentToken?.label ?? '',
	};
};
