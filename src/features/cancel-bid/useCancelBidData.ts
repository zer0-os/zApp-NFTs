import {
	useWeb3,
	useBidData,
	useDomainData,
	usePaymentToken,
	useDomainMetadata,
	useUserTokenBalance,
} from '../../lib/hooks';
import {
	getDomainId,
	getParentZna,
	getUserBids,
	sortBidsByAmount,
} from '../../lib/util';

export const useCancelBidData = (zna: string) => {
	const { account } = useWeb3();

	const domainId = getDomainId(zna);
	const parentZna = getParentZna(zna);

	const { data: paymentToken } = usePaymentToken(parentZna);
	const { data: allBids, isLoading: isLoadingBids } = useBidData(domainId);
	const { data: domain, isLoading: isLoadingDomain } = useDomainData(domainId);
	const { sortedBids, highestBid } = sortBidsByAmount(allBids);
	const { highestUserBid } = getUserBids(account, sortedBids);

	const { data: metadata, isLoading: isLoadingMetadata } =
		useDomainMetadata(domainId);

	const { data: tokenBalance, isLoading: isLoadingTokenBalance } =
		useUserTokenBalance(account, paymentToken?.id);

	const title = metadata?.title;
	const creator = domain?.minter;
	const balanceAsString = tokenBalance?.balanceAsString ?? '';
	const imageSrc =
		metadata?.animation_url || metadata?.image_full || metadata?.image || '';
	const imageAlt = `${metadata?.title ?? 'loading'} nft image`;
	const paymentTokenSymbol = paymentToken?.symbol ?? '';
	const isLeadingBid = highestUserBid?.amount >= highestBid?.amount;

	const isLoading =
		isLoadingDomain ||
		isLoadingBids ||
		isLoadingMetadata ||
		isLoadingTokenBalance;

	return {
		domainId,
		title,
		creator,
		imageSrc,
		imageAlt,
		highestBid,
		allBids,
		highestUserBid,
		isLeadingBid,
		balanceAsString,
		paymentTokenSymbol,
		isLoading,
	};
};
