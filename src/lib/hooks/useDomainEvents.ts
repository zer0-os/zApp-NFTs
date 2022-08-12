//- React Imports
import { useQuery } from 'react-query';

//- Types Imports
import { DomainEvents } from '../../lib/types/events';

//- Hooks Imports
import { useZnsSdk } from './useZnsSdk';

export const useDomainEvents = (domainId: string) => {
	// SDK
	const sdk = useZnsSdk();

	// Query
	return useQuery(
		`domain-events-data-${domainId}`,
		async () =>
			(domainId && (await sdk.getDomainEvents(domainId))) as DomainEvents[],
		{
			retry: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	);
};
