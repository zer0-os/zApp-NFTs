import { FC } from 'react';

import { TokenPriceInfo } from '@zero-tech/zns-sdk';

import { Skeleton } from '@zero-tech/zui/components';
import { HistoryItem } from '..';

import { DomainEvent } from '../../../lib/types/events';

import { useDomainEvents } from '../../../lib/hooks/useDomainEvents';

import { sortEventsByTimestamp } from './HistoryList.utils';

import styles from './HistoryList.module.scss';

type HistoryListProps = {
	domainId: string;
	paymentToken: TokenPriceInfo;
};

const CONFIG = {
	numSkeletons: 3,
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

			<ul className={styles.Container}>
				{sortedDomainEvents?.length > 0 ? (
					<>
						{sortedDomainEvents?.map((item: DomainEvent, i: number) => (
							<div key={i}>
								<HistoryItem item={item} paymentToken={paymentToken} />
							</div>
						))}
					</>
				) : (
					[...Array(CONFIG.numSkeletons)].map((_, i) => (
						<Skeleton key={i} className={styles.Skeleton} />
					))
				)}
			</ul>
		</section>
	);
};
