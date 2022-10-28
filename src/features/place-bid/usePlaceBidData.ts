import { useWeb3 } from '../../lib/hooks/useWeb3';
import { useDomainData } from '../../lib/hooks/useDomainData';
import { useDomainMetrics } from '../../lib/hooks/useDomainMetrics';
import { useDomainMetadata } from '../../lib/hooks/useDomainMetadata';
import { useUserTokenBalance } from '../../lib/hooks/useUserTokenBalance';
import { usePaymentTokenForDomain } from '../../lib/hooks/usePaymentTokenForDomain';

export const usePlaceBidData = (domainId: string) => {
	const { account } = useWeb3();

	const { data: domain, isLoading: isLoadingDomain } = useDomainData(domainId);
	const { data: metrics, isLoading: isLoadingMetrics } =
		useDomainMetrics(domainId);
	const { data: metadata, isLoading: isLoadingMetadata } =
		useDomainMetadata(domainId);
	const { data: paymentTokenForDomain } = usePaymentTokenForDomain(domainId);
	const { data: tokenBalance } = useUserTokenBalance(
		account,
		paymentTokenForDomain,
	);

	const zna = domain?.name;
	const title = metadata?.title;
	const creator = domain?.minter;
	const highestBid = metrics?.highestBid;
	const balanceAsString = tokenBalance?.balanceAsString;
	const imageSrc = metadata?.previewImage ?? metadata?.image;
	const imageAlt = `${metadata?.title ?? 'loading'} nft image`;

	return {
		zna,
		title,
		creator,
		imageSrc,
		imageAlt,
		highestBid,
		balanceAsString,
		paymentTokenForDomain,
		isLoadingDomain,
		isLoadingMetrics,
		isLoadingMetadata,
	};
};
