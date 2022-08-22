//- React Imports
import { FC } from 'react';

//- Library Imports
import { TokenPriceInfo } from '@zero-tech/zns-sdk';

//- Component Imports
import HistoryItem from '../HistoryItem/HistoryItem';

//- Types Imports
import { DomainEvents } from '../../../lib/types/events';

type HistoryListProps = {
	events: DomainEvents[];
	paymentToken: TokenPriceInfo;
};

const HistoryList: FC<HistoryListProps> = ({ events, paymentToken }) => {
	return (
		<section>
			<h4>History</h4>

			{events?.length > 0 && (
				<ul style={{ listStyle: 'none', padding: '0' }}>
					{events?.map((item: DomainEvents, i: number) => (
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
