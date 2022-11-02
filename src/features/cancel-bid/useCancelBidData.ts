import { useWeb3 } from '../../lib/hooks/useWeb3';
import { useDomainData } from '../../lib/hooks/useDomainData';
import { usePaymentToken } from '../../lib/hooks/usePaymentToken';
import { useDomainMetrics } from '../../lib/hooks/useDomainMetrics';
import { useDomainMetadata } from '../../lib/hooks/useDomainMetadata';
import { useUserTokenBalance } from '../../lib/hooks/useUserTokenBalance';
import { getDomainId, getParentZna } from '../../lib/util';

export const useCancelBidData = (zna: string) => {
	const { account } = useWeb3();

	const domainId = getDomainId(zna);
	const parentZna = getParentZna(zna);

	const { data: domain, isLoading: isLoadingDomain } = useDomainData(domainId);
	const { data: metrics, isLoading: isLoadingMetrics } =
		useDomainMetrics(domainId);
	const { data: metadata, isLoading: isLoadingMetadata } =
		useDomainMetadata(domainId);
	const { data: paymentToken } = usePaymentToken(parentZna);
	const { data: tokenBalance } = useUserTokenBalance(account, paymentToken?.id);

	const title = metadata?.title;
	const creator = domain?.minter;
	const highestBid = metrics?.highestBid;
	const balanceAsString = tokenBalance?.balanceAsString ?? '';
	const imageSrc = metadata?.previewImage ?? metadata?.image;
	const imageAlt = `${metadata?.title ?? 'loading'} nft image`;
	const paymentTokenLabel = paymentToken?.label ?? '';

	return {
		domainId,
		title,
		creator,
		imageSrc,
		imageAlt,
		highestBid,
		balanceAsString,
		paymentTokenLabel,
		isLoadingDomain,
		isLoadingMetrics,
		isLoadingMetadata,
	};
};
