//- React Imports
import { useMemo } from 'react';

//- Library Imports
import { DomainBidEvent, DomainEventType } from '@zero-tech/zns-sdk';

//- Types Imports
import { DomainEvents } from '../../lib/types/events';

type UseBidDataReturn = {
	bids: DomainBidEvent[];
};

export const useBidData = (domainEvents: DomainEvents[]): UseBidDataReturn => {
	const bids: DomainBidEvent[] = useMemo(() => {
		return domainEvents?.filter(
			(e: DomainEvents) => e.type === DomainEventType.bid,
		) as DomainBidEvent[];
	}, [domainEvents]);

	return {
		bids,
	};
};
