import { useSubdomainData } from './useSubdomainData';
import { useDomainData } from './useDomainData';
import { usePaymentTokenInfo } from './usePaymentTokenInfo';
import { usePaymentTokenForDomain } from './usePaymentTokenForDomain';
import { useDomainMetadata } from './useDomainMetadata';
import { useDomainMetrics } from './useDomainMetrics';
import { useViewNavigation } from './useViewNavigation';
import { useBidData } from './useBidData';
import { useBuyNowPrice } from './useBuyNowPrice';
import { useDomainEvents } from './useDomainEvents';

export const useDataContainer = (domainId: string) => {
	const { data: domain } = useDomainData(domainId);
	const { data: bids } = useBidData(domainId);
	const { data: domainEvents } = useDomainEvents(domainId);
	const { data: buyNowPrice } = useBuyNowPrice(domainId);
	const { data: subdomainData, isLoading: isSubdomainDataLoading } =
		useSubdomainData(domainId);
	const { data: paymentToken } = usePaymentTokenForDomain(domainId);
	const { data: paymentTokenInfo } = usePaymentTokenInfo(paymentToken);
	const { data: metrics, isLoading: isMetricsLoading } =
		useDomainMetrics(domainId);
	const { data: domainMetadata } = useDomainMetadata(domain?.metadataUri);
	const { isNFTView } = useViewNavigation(subdomainData);

	return {
		domain,
		subdomainData,
		isSubdomainDataLoading,
		paymentTokenInfo,
		metrics,
		isMetricsLoading,
		domainMetadata,
		isNFTView,
		bids,
		buyNowPrice,
		domainEvents,
	};
};
