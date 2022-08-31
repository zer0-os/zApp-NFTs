//- React Imports
import { FC, ReactNode } from 'react';

//- Components Improts
import { Card } from '@zero-tech/zui/src/components/Card';

//- Style Imports
import styles from './StatsWidget.module.scss';

type Text = {
	text?: string | ReactNode;
	isLoading?: boolean;
};

type Stat = {
	title: string;
	value?: string | number | Text;
	text?: string | number | Text;
};

type StatsWidgetProps = {
	stats: Stat[];
};

const StatsWidget: FC<StatsWidgetProps> = ({ stats }) => (
	<div className={styles.Stats}>
		{stats.map((stat: Stat, index) => (
			<div key={`stats-widget-${index}`}>
				<Card title={stat.title} value={stat.value} bottomText={stat.text} />
			</div>
		))}
	</div>
);

export default StatsWidget;
