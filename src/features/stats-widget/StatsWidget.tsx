//- React Imports
import type { FC, ReactNode } from 'react';

//- Components Improts
import Card from 'zero-ui/src/components/Card';

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
	<div
		style={{
			display: 'flex',
			justifyContent: 'space-between',
		}}
	>
		{stats.map((stat: Stat, index) => (
			<div key={`stats-widget-${index}`} style={{ width: '32%' }}>
				<Card title={stat.title} value={stat.value} bottomText={stat.text} />
			</div>
		))}
	</div>
);

export default StatsWidget;
