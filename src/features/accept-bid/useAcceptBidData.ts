import { useWeb3 } from '../../lib/hooks/useWeb3';
import { useDomainData } from '../../lib/hooks/useDomainData';
import { useDomainMetrics } from '../../lib/hooks/useDomainMetrics';
import { useDomainMetadata } from '../../lib/hooks/useDomainMetadata';
import { useUserTokenBalance } from '../../lib/hooks/useUserTokenBalance';
import { usePaymentTokenForDomain } from '../../lib/hooks/usePaymentTokenForDomain';

export const useAcceptBidData = (domainId: string) => {
	const { account } = useWeb3();
	const { data: domain, isLoading: isDomainLoading } = useDomainData(domainId);
	const { data: metrics, isLoading: isMetricsLoading } =
		useDomainMetrics(domainId);
	const { data: metadata, isLoading: isMetadataLoading } = useDomainMetadata(
		domain?.metadataUri,
	);
	const { data: paymentTokenForDomain } = usePaymentTokenForDomain(domainId);
	const { data: tokenBalance } = useUserTokenBalance(
		account,
		paymentTokenForDomain,
	);

	const imageSrc = metadata?.previewImage ?? metadata?.image;
	const imageAlt = `${metadata?.title ?? 'loading'} nft image`;

	return {
		domain,
		isDomainLoading,
		metrics,
		isMetricsLoading,
		metadata,
		isMetadataLoading,
		imageSrc,
		imageAlt,
		paymentTokenForDomain,
		tokenBalance,
	};
};
