import { BigNumber } from 'ethers';
import { Bid } from '@zero-tech/zns-sdk/lib/zAuction';

export const sortBidsByAmount = (bids: Bid[]) => {
	return bids?.sort((a, b) =>
		BigNumber.from(a.amount).gte(BigNumber.from(b.amount)) ? -1 : 1,
	);
};

export const getUserBids = (accountId: string, bids: Bid[]) => {
	const userBids = bids?.filter(
		(b) => b.bidder.toLowerCase() === accountId?.toLowerCase(),
	);
	return sortBidsByAmount(userBids);
};
