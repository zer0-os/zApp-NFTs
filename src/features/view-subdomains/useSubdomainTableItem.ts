import { useBuyNowPrice } from '../../lib/hooks/useBuyNowPrice';
import { usePaymentToken } from '../../lib/hooks/usePaymentToken';
import { useDomainMetrics } from '../../lib/hooks/useDomainMetrics';
import { useDomainMetadata } from '../../lib/hooks/useDomainMetadata';
import { getDomainId, getParentZna, formatEthers } from '../../lib/util';

interface UseSubdomainTableItem {
	zna: string;
}

export const useSubdomainTableItem = ({ zna }: UseSubdomainTableItem) => {
	const parentZna = getParentZna(zna);
	const domainId = getDomainId(zna);

	const { data: metrics, isLoading: isLoadingMetrics } =
		useDomainMetrics(domainId);
	const { data: buyNowPrice, isLoading: isLoadingBuyNowPrice } =
		useBuyNowPrice(domainId);
	const { data: metadata, isLoading: isLoadingMetadata } =
		useDomainMetadata(domainId);
	const { data: paymentToken } = usePaymentToken(parentZna);

	const image = metadata?.previewImage ?? metadata?.image;
	const alt = (metadata?.name ?? zna) + ' preview image';
	const isLoading = isLoadingMetrics || isLoadingBuyNowPrice;

	const volume = metrics?.volume?.all
		? formatEthers(metrics.volume.all)
		: undefined;
	const highestBid = metrics?.highestBid
		? formatEthers(metrics.highestBid)
		: undefined;

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
