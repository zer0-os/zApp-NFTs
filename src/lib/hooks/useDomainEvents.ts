import { useQuery } from 'react-query';

import { DomainEvent } from '../types/events';

import { useZnsSdk } from './useZnsSdk';

export const useDomainEvents = (domainId: string) => {
	const sdk = useZnsSdk();

	return useQuery(
		['domain', 'events', { domainId }],
		async () => (await sdk.getDomainEvents(domainId)) as DomainEvent[],
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: Boolean(domainId),
		},
	);
};
