//- React Imports
import { FC } from 'react';

//- Library Imports
import moment from 'moment';

//- Types Imports
import { DomainEvents } from '../../../lib/types/events';

type HistoryListProps = {
	events: DomainEvents[];
};

const HistoryList: FC<HistoryListProps> = ({ events }) => {
	return (
		<section>
			<h4>History</h4>

			{events?.length > 0 && (
				<ul style={{ listStyle: 'none', padding: '0' }}>
					{events?.map((item: DomainEvents, i: number) => (
						<div key={i}>
							{/* todo: handle type and copy - add history list item component */}
							Type: {item.type} Time:{' '}
							<>{moment(Number(item.timestamp) * 1000).fromNow()}</>
						</div>
					))}
				</ul>
			)}
		</section>
	);
};

export default HistoryList;
