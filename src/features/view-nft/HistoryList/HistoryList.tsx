//- React Imports
import { FC } from 'react';

//- Library Imports
import { TokenPriceInfo } from '@zero-tech/zns-sdk';

//- Component Imports
import HistoryItem from '../HistoryItem/HistoryItem';

//- Types Imports
import { DomainEvent } from '../../../lib/types/events';

//- Utils Imports
import { sortEventsByTimestamp } from './HistoryList.utils';

type HistoryListProps = {
	events: DomainEvent[];
	paymentToken: TokenPriceInfo;
};

const HistoryList: FC<HistoryListProps> = ({ events, paymentToken }) => {
	const sortedDomainEvents = sortEventsByTimestamp(events);

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
