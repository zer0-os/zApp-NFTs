import { FC } from 'react';

import { TokenPriceInfo } from '@zero-tech/zns-sdk';

import { HistoryItem } from '../HistoryItem/HistoryItem';

import { DomainEvent } from '../../../lib/types/events';

import { useDomainEvents } from '../../../lib/hooks/useDomainEvents';

import { sortEventsByTimestamp } from './HistoryList.utils';

import styles from './HistoryList.module.scss';

type HistoryListProps = {
	domainId: string;
	paymentToken: TokenPriceInfo;
};

export const HistoryList: FC<HistoryListProps> = ({
	domainId,
	paymentToken,
}) => {
	const { data: domainEvents } = useDomainEvents(domainId);
	const sortedDomainEvents = sortEventsByTimestamp(domainEvents);

	return (
		<section>
			<h4>History</h4>

			{sortedDomainEvents?.length > 0 && (
				<ul className={styles.Container}>
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
