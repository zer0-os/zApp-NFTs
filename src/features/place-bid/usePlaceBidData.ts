import { useWeb3 } from '../../lib/hooks/useWeb3';
import { useDomainData } from '../../lib/hooks/useDomainData';
import { useDomainMetrics } from '../../lib/hooks/useDomainMetrics';
import { useDomainMetadata } from '../../lib/hooks/useDomainMetadata';
import { useUserTokenBalance } from '../../lib/hooks/useUserTokenBalance';
import { usePaymentTokenForDomain } from '../../lib/hooks/usePaymentTokenForDomain';
import { getDomainId } from '../../lib/util';

export const usePlaceBidData = (zna: string) => {
	const { account } = useWeb3();

	const domainId = getDomainId(zna);

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

	const title = metadata?.title;
	const creator = domain?.minter;
	const highestBid = metrics?.highestBid;
	const balanceAsString = tokenBalance?.balanceAsString;
	const imageSrc = metadata?.previewImage ?? metadata?.image;
	const imageAlt = `${metadata?.title ?? 'loading'} nft image`;

	return {
		domainId,
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
