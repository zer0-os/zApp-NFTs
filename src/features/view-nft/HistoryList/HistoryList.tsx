import { FC } from 'react';

import { Skeleton } from '@zero-tech/zui/components';
import { HistoryItem } from '../HistoryItem';

import { getDomainId } from '../../../lib/util/domains/domains';
import { usePaymentToken } from '../../../lib/hooks/usePaymentToken';
import { useDomainEvents } from '../../../lib/hooks/useDomainEvents';
import { DomainEvent } from '../../../lib/types/events';

import { sortEventsByTimestamp } from './HistoryList.utils';

import styles from './HistoryList.module.scss';

type HistoryListProps = {
	zna: string;
};

const CONFIG = {
	numSkeletons: 3,
};

export const HistoryList: FC<HistoryListProps> = ({ zna }) => {
	const domainId = getDomainId(zna);
	const { data: domainEvents } = useDomainEvents(domainId);
	const { data: paymentToken } = usePaymentToken(zna);

	const sortedDomainEvents = sortEventsByTimestamp(domainEvents);

	return (
		<section>
			<h4>History</h4>

			<ul className={styles.Container}>
				{sortedDomainEvents?.length > 0 ? (
					<>
						{sortedDomainEvents?.map((item: DomainEvent, i: number) => (
							<div key={i}>
								<HistoryItem item={item} tokenName={paymentToken?.symbol} />
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
