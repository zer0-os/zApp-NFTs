//- Library Imports
import { DomainEventType } from '@zero-tech/zns-sdk';
import { Bid } from '@zero-tech/zns-sdk/lib/zAuction';

//- Types Imports
import { DomainEvents } from '../../lib/types/events';

//- Utils Imports
import { formatEthers } from '../../lib/util/number/number';

export const sortEventsByTimestamp = (
	events: DomainEvents[],
	asc: boolean = true,
): DomainEvents[] => {
	return events?.sort((a: DomainEvents, b: DomainEvents) => {
		const aVal =
			a.type === DomainEventType.bid
				? Number(a.timestamp)
				: Number(a.timestamp) * 1000;
		const bVal =
			b.type === DomainEventType.bid
				? Number(b.timestamp)
				: Number(b.timestamp) * 1000;

		return asc ? bVal - aVal : aVal - bVal;
	});
};

export const getHighestBid = (bids: Bid[]) =>
	Math.max.apply(
		null,
		bids?.length > 0
			? bids?.map((bid) => Number(formatEthers(bid.amount)))
			: [null],
	);

export const getUserBids = (accountId: string, bids?: Bid[]) => {
	const userBids = bids?.filter(
		(b) => b.bidder.toLowerCase() === accountId?.toLowerCase(),
	);
	return userBids;
};
