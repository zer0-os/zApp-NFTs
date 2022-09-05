//- Library Imports
import { DomainEventType } from '@zero-tech/zns-sdk';

//- Types Imports
import { DomainEvent } from '../../../lib/types/events';

export const sortEventsByTimestamp = (
	events: DomainEvent[],
	asc: boolean = true,
): DomainEvent[] => {
	return events?.sort((a: DomainEvent, b: DomainEvent) => {
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
