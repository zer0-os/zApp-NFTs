//- Library Imports
import { Bid } from '@zero-tech/zns-sdk/lib/zAuction';

//- Utils Imports
import { formatEthers } from '../../../lib/util/number/number';

export const getHighestBid = (bids: Bid[]) =>
	Math.max.apply(
		null,
		bids?.length > 0
			? bids?.map((bid) => Number(formatEthers(bid.amount)))
			: [null],
	);

export const getUserBids = (accountId: string, bids: Bid[]) => {
	const userBids = bids?.filter(
		(b) => b.bidder.toLowerCase() === accountId?.toLowerCase(),
	);
	return userBids;
};
