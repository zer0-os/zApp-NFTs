import { Bid } from '@zero-tech/zns-sdk/lib/zAuction';
import { BigNumber } from 'ethers';

import { formatEthers } from '../../../lib/util/number/number';

export const getHighestBid = (bids: Bid[]) =>
	Math.max.apply(
		null,
		bids?.length > 0
			? bids?.map((bid) => Number(formatEthers(bid.amount)))
			: [null],
	);

export const sortBidsByAmount = (bids: Bid[]) => {
	return bids?.sort((a, b) =>
		BigNumber.from(a.amount).gte(BigNumber.from(b.amount)) ? -1 : 1,
	);
};

export const getUserBids = (accountId: string, bids: Bid[]) => {
	const userBids = bids?.filter(
		(b) => b.bidder.toLowerCase() === accountId?.toLowerCase(),
	);
	return userBids;
};
