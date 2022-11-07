import { BigNumber } from 'ethers';
import { Bid } from '@zero-tech/zns-sdk/lib/zAuction';

/**
 * Sorts a list of bids, by time, from most recent to oldest.
 * @param bids list of bids to sort
 */
export const sortBidsByTime = (bids: Bid[]) => {
	return bids
		?.slice()
		.sort((a: Bid, b: Bid) => Number(b.timestamp) - Number(a.timestamp));
};

/**
 * Sorts a list of bids, by amount, from highest to lowest.
 * Returns sorted bids by amount and highest bid.
 * @param bids list of bids to sort
 */
export const sortBidsByAmount = (bids: Bid[]) => {
	const sortedBids = bids?.sort((a, b) =>
		BigNumber.from(a.amount).gte(BigNumber.from(b.amount)) ? -1 : 1,
	);

	const highestBid = sortedBids?.length > 0 ? sortedBids[0] : undefined;

	return { sortedBids, highestBid };
};

/**
 * Gets a list of a users bids and the highest user bid.
 * @param accountId connected account
 * @param bids list of bids to filter
 */
export const getUserBids = (accountId: string, bids: Bid[]) => {
	const userBids = bids?.filter(
		(b) => b.bidder.toLowerCase() === accountId?.toLowerCase(),
	);

	const highestUserBid = userBids?.length > 0 ? userBids[0] : undefined;

	return { userBids, highestUserBid };
};
