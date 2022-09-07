import { FC, ReactNode } from 'react';

import { Card } from '@zero-tech/zui/src/components';

import styles from './StatsList.module.scss';

type Text = {
	text?: string | ReactNode;
	isLoading?: boolean;
};

type Stat = {
	title: string;
	value?: string | number | Text;
	text?: string | number | Text;
};

type StatsListProps = {
	stats: Stat[];
};

export const StatsList: FC<StatsListProps> = ({ stats }) => (
	<ul className={styles.Stats} style={{ listStyle: 'none', padding: '0' }}>
		{stats.map((stat: Stat, index) => (
			<li key={`stat-${index}`}>
				<Card title={stat.title} value={stat.value} bottomText={stat.text} />
			</li>
		))}
	</ul>
);
