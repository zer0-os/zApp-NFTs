import { useDomainMetrics } from '../../lib/hooks/useDomainMetrics';
import { useBuyNowPrice } from '../../lib/hooks/useBuyNowPrice';
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
		useBuyNowPrice(domainId);
	const { data: metadata, isLoading: isLoadingMetadata } =
		useDomainMetadata(domainId);
	const { data: paymentToken } = usePaymentToken(parentZna);

	const image = metadata?.previewImage ?? metadata?.image;
	const alt = (metadata?.name ?? zna) + ' preview image';
	const isLoading = isLoadingMetrics || isLoadingBuyNowPrice;
	const paymentTokenLabel = paymentToken?.name ? `(${paymentToken?.name})` : '';

	return {
		volume: metrics?.volume?.all
			? formatEthers(metrics?.volume?.all)
			: undefined,
		highestBid: metrics?.highestBid
			? formatEthers(metrics?.highestBid)
			: undefined,
		image,
		alt,
		isLoadingMetrics,
		isLoadingMetadata,
		isLoading,
		buyNowPrice,
		metadata,
		paymentTokenLabel,
	};
};
