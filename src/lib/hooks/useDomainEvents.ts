//- React Imports
import { useQuery } from 'react-query';

//- Types Imports
import { DomainEvent } from '../../lib/types/events';

//- Hooks Imports
import { useZnsSdk } from './useZnsSdk';

export const useDomainEvents = (domainId: string) => {
	// SDK
	const sdk = useZnsSdk();

	// Query
	return useQuery(
		['domain-events', domainId],
		async () =>
			domainId && ((await sdk.getDomainEvents(domainId)) as DomainEvent[]),
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	);
};
