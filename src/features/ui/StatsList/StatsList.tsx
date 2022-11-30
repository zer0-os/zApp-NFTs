import { FC } from 'react';

import { AsyncText } from '@zero-tech/zui/lib/types';

import { Card } from '@zero-tech/zui/components/Card';

import styles from './StatsList.module.scss';

type Stat = {
	title: string;
	value?: string | AsyncText;
	text?: string | AsyncText;
};

type StatsListProps = {
	stats: Stat[];
};

export const StatsList: FC<StatsListProps> = ({ stats }) => (
	<ul className={styles.Stats}>
		{stats.map((stat: Stat, index) => (
			<li key={`stat-${index}`}>
				<Card
					label={stat.title}
					primaryText={stat.value}
					secondaryText={stat.text}
				/>
			</li>
		))}
	</ul>
);
