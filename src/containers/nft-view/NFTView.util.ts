//- Library Imports
import { DomainEventType } from '@zero-tech/zns-sdk';

//- Types Imports
import { DomainEvents } from '../../lib/types/events';

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
