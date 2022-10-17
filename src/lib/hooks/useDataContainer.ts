import { useBidData } from './useBidData';
import { useBuyNowPrice } from './useBuyNowPrice';
import { useDomainData } from './useDomainData';
import { useDomainEvents } from './useDomainEvents';
import { useDomainMetadata } from './useDomainMetadata';
import { useDomainMetrics } from './useDomainMetrics';
import { useSubdomainData } from './useSubdomainData';
import { usePaymentTokenInfo } from './usePaymentTokenInfo';
import { usePaymentTokenForDomain } from './usePaymentTokenForDomain';
import { useViewNavigation } from './useViewNavigation';

export const useDataContainer = (domainId: string) => {
	const { data: bids } = useBidData(domainId);
	const { data: buyNowPrice } = useBuyNowPrice(domainId);
	const { data: domainEvents } = useDomainEvents(domainId);
	const { data: paymentToken } = usePaymentTokenForDomain(domainId);
	const { data: paymentTokenInfo } = usePaymentTokenInfo(paymentToken);
	const { data: domainMetadata } = useDomainMetadata(domain?.metadataUri);
	const { data: metrics, isLoading: isMetricsLoading } =
		useDomainMetrics(domainId);
  const { data: domain, isLoading: isDomainDataLoading } =
		useDomainData(domainId);
	const { data: subdomainData, isLoading: isSubdomainDataLoading } =
		useSubdomainData(domainId);
	const { isNFTView } = useViewNavigation(subdomainData);

	return {
		bids,
		domain,
		buyNowPrice,
		domainEvents,
		isDomainDataLoading,
		subdomainData,
		paymentTokenInfo,
		domainMetadata,
		metrics,
		isMetricsLoading,
		subdomainData,
		isSubdomainDataLoading,
		isNFTView,
	};
};
