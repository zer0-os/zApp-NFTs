import { useBuyNowListing, useDomainData, useWeb3 } from '../../lib/hooks';
import {
	usePaymentToken,
	useDomainMetrics,
	useDomainMetadata,
} from '../../lib/hooks';
import { getDomainId, getParentZna, formatEthers } from '../../lib/util';

interface UseSubdomainTableItem {
	zna: string;
}

export const useSubdomainTableItem = ({ zna }: UseSubdomainTableItem) => {
	const { account } = useWeb3();
	const parentZna = getParentZna(zna);
	const domainId = getDomainId(zna);

	const { data: domain } = useDomainData(domainId);
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
	const isOwnedByUser = domain?.owner?.toLowerCase() === account?.toLowerCase();

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
		paymentTokenSymbol: paymentToken?.symbol ?? '',
		isOwnedByUser,
	};
};
