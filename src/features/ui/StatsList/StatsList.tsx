//- React Imports
import { FC, ReactNode } from 'react';

//- Components Improts
import { Card } from '@zero-tech/zui/src/components';

//- Style Imports
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

const StatsList: FC<StatsListProps> = ({ stats }) => (
	<div className={styles.Stats}>
		{stats.map((stat: Stat, index) => (
			<div key={`stat-${index}`}>
				<Card title={stat.title} value={stat.value} bottomText={stat.text} />
			</div>
		))}
	</div>
);

export default StatsList;
