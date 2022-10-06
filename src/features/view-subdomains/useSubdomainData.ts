import { useDomainMetrics } from '../../lib/hooks/useDomainMetrics';
import { useBuyNowPrice } from '../../lib/hooks/useBuyNowPrice';
import { useDomainMetadata } from '../../lib/hooks/useDomainMetadata';
import { TokenPriceInfo } from '@zero-tech/zns-sdk';

interface UseSubdomainData {
	id: string;
	zna: string;
	metadataUri?: string;
	paymentTokenData?: TokenPriceInfo;
}

export const useSubdomainData = ({
	id,
	zna,
	metadataUri,
	paymentTokenData,
}: UseSubdomainData) => {
	const { data: metrics, isLoading: isMetricsLoading } = useDomainMetrics(id);
	const { data: buyNowPrice, isLoading: isBuyNowPriceLoading } =
		useBuyNowPrice(id);
	const { data: metadata, isLoading: isMetadataLoading } =
		useDomainMetadata(metadataUri);

	const imageSrc = metadata?.previewImage ?? metadata?.image;
	const imageAlt = metadata?.name ?? zna + ' image';
	const isButtonDisabled = isMetricsLoading || isBuyNowPriceLoading;
	const paymentTokenLabel = paymentTokenData?.name
		? `(${paymentTokenData?.name})`
		: '';

	return {
		metrics,
		buyNowPrice,
		metadata,
		isMetadataLoading,
		isMetricsLoading,
		isBuyNowPriceLoading,
		isButtonDisabled,
		imageSrc,
		imageAlt,
		paymentTokenLabel,
	};
};
