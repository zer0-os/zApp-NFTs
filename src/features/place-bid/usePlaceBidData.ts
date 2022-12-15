import {
	useWeb3,
	useBidData,
	useDomainData,
	usePaymentToken,
	useDomainMetrics,
	useDomainMetadata,
	useUserTokenBalance,
} from '../../lib/hooks';
import { getDomainId, getParentZna } from '../../lib/util';

export const usePlaceBidData = (zna: string) => {
	const { account } = useWeb3();

	const domainId = getDomainId(zna);
	const parentZna = getParentZna(zna);

	const { data: domain, isLoading: isLoadingDomain } = useDomainData(domainId);

	const { data: metrics, isLoading: isLoadingMetrics } =
		useDomainMetrics(domainId);
	const { data: metadata, isLoading: isLoadingMetadata } =
		useDomainMetadata(domainId);
	const { data: paymentToken } = usePaymentToken(parentZna);
	const { data: tokenBalance, isLoading: isLoadingTokenBalance } =
		useUserTokenBalance(account, paymentToken?.id);
	const { data: bids } = useBidData(domainId);

	const title = metadata?.title;
	const creator = domain?.minter;
	const highestBid = metrics?.highestBid;
	const balanceAsString = tokenBalance?.balanceAsString ?? '';
	const imageSrc = metadata?.previewImage ?? metadata?.image;
	const imageAlt = `${metadata?.title ?? 'loading'} nft image`;
	const paymentTokenSymbol = paymentToken?.symbol ?? '';
	const paymentTokenId = paymentToken?.id ?? '';
	const tokenBalanceString = tokenBalance?.balanceAsString ?? '';

	return {
		domainId,
		bids,
		title,
		creator,
		imageSrc,
		imageAlt,
		highestBid,
		balanceAsString,
		paymentTokenSymbol,
		paymentTokenId,
		tokenBalanceString,
		isLoadingDomain,
		isLoadingMetrics,
		isLoadingMetadata,
		isLoadingTokenBalance,
	};
};
