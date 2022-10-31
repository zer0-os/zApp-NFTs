import { BigNumber } from 'ethers';
import { Bid } from '@zero-tech/zns-sdk/lib/zAuction';

/**
 * Sorts a list of bids, by time, from most recent to oldest.
 * @param bids list of bids to sort
 */
export const sortBidsByTime = (bids: Bid[]) => {
	return bids
		.slice()
		.sort((a: Bid, b: Bid) => Number(b.timestamp) - Number(a.timestamp));
};

/**
 * Sorts a list of bids, by amount, from highest to lowest.
 * @param bids list of bids to sort
 */
export const sortBidsByAmount = (bids: Bid[]) => {
	return bids?.sort((a, b) =>
		BigNumber.from(a.amount).gte(BigNumber.from(b.amount)) ? -1 : 1,
	);
};

/**
 * Gets a list of a users bids.
 * @param accountId connected account
 * @param bids list of bids filter
 */
export const getUserBids = (accountId: string, bids: Bid[]) => {
	const userBids = bids?.filter(
		(b) => b.bidder.toLowerCase() === accountId?.toLowerCase(),
	);
	return sortBidsByAmount(userBids);
};
