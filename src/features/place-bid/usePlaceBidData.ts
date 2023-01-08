import {
	useWeb3,
	useBidData,
	useDomainData,
	usePaymentToken,
	useDomainMetadata,
	useUserTokenBalance,
} from '../../lib/hooks';
import { getDomainId, getParentZna, sortBidsByAmount } from '../../lib/util';

export const usePlaceBidData = (zna: string) => {
	const { account } = useWeb3();

	const domainId = getDomainId(zna);
	const parentZna = getParentZna(zna);

	const { data: domain, isLoading: isLoadingDomain } = useDomainData(domainId);

	const { data: metadata, isLoading: isLoadingMetadata } =
		useDomainMetadata(domainId);
	const { data: paymentToken } = usePaymentToken(parentZna);
	const { data: tokenBalance, isLoading: isLoadingTokenBalance } =
		useUserTokenBalance(account, paymentToken?.id);

	const { data: bids, isLoading: isLoadingBidData } = useBidData(domainId);
	const { highestBid } = sortBidsByAmount(bids);

	const title = metadata?.title;
	const creator = domain?.minter;
	const balanceAsString = tokenBalance?.balanceAsString ?? '';
	const imageSrc =
		metadata?.animation_url || metadata?.image_full || metadata?.image || '';
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
		isLoadingBidData,
		isLoadingMetadata,
		isLoadingTokenBalance,
	};
};
