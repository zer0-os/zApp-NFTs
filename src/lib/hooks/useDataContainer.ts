//- Hook Imports
import { useSubdomainData } from './useSubdomainData';
import { useDomainData } from './useDomainData';
import { usePaymentTokenInfo } from './usePaymentTokenInfo';
import { usePaymentTokenForDomain } from './usePaymentTokenForDomain';
import { useDomainMetadata } from './useDomainMetadata';
import { useDomainMetrics } from './useDomainMetrics';
import { useViewNavigation } from './useViewNavigation';

export const useDataContainer = (domainId: string) => {
	const { data: domain } = useDomainData(domainId);
	const { data: subdomainData } = useSubdomainData(domainId);
	const { data: paymentToken } = usePaymentTokenForDomain(domainId);
	const { data: paymentTokenInfo } = usePaymentTokenInfo(paymentToken);
	const { data: metrics } = useDomainMetrics(domainId);
	const { data: domainMetadata } = useDomainMetadata(domain?.metadataUri);
	const { isNFTView } = useViewNavigation(subdomainData);

	return {
		domain,
		subdomainData,
		paymentTokenInfo,
		metrics,
		domainMetadata,
		isNFTView,
	};
};
