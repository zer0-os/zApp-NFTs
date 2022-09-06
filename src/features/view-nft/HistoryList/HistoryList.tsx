//- React Imports
import { FC } from 'react';

//- Library Imports
import { TokenPriceInfo } from '@zero-tech/zns-sdk';

//- Component Imports
import HistoryItem from '../HistoryItem/HistoryItem';

//- Types Imports
import { DomainEvent } from '../../../lib/types/events';

//- Hooks Imports
import { useDomainEvents } from '../../../lib/hooks/useDomainEvents';

//- Utils Imports
import { sortEventsByTimestamp } from './HistoryList.utils';

type HistoryListProps = {
	domainId: string;
	paymentToken: TokenPriceInfo;
};

const HistoryList: FC<HistoryListProps> = ({ domainId, paymentToken }) => {
	const { data: domainEvents } = useDomainEvents(domainId);
	const sortedDomainEvents = sortEventsByTimestamp(domainEvents);

	return (
		<section>
			<h4>History</h4>

			{sortedDomainEvents?.length > 0 && (
				<ul style={{ listStyle: 'none', padding: '0' }}>
					{sortedDomainEvents?.map((item: DomainEvent, i: number) => (
						<div key={i}>
							<HistoryItem item={item} paymentToken={paymentToken} />
						</div>
					))}
				</ul>
			)}
		</section>
	);
};

export default HistoryList;
