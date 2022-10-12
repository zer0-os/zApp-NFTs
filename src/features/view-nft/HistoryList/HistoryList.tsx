import { FC } from 'react';

import { HistoryItem } from '..';

import { DomainEvent } from '../../../lib/types/events';

import { useDataContainer } from '../../../lib/hooks/useDataContainer';

import { sortEventsByTimestamp } from './HistoryList.utils';

import styles from './HistoryList.module.scss';

type HistoryListProps = {
	domainId: string;
};

export const HistoryList: FC<HistoryListProps> = ({ domainId }) => {
	const { paymentTokenInfo, domainEvents } = useDataContainer(domainId);

	const sortedDomainEvents = sortEventsByTimestamp(domainEvents);

	return (
		<section>
			<h4>History</h4>

			{sortedDomainEvents?.length > 0 && (
				<ul className={styles.Container}>
					{sortedDomainEvents?.map((item: DomainEvent, i: number) => (
						<div key={i}>
							<HistoryItem item={item} paymentToken={paymentTokenInfo} />
						</div>
					))}
				</ul>
			)}
		</section>
	);
};
