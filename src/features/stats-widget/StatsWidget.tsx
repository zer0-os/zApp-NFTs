//- React Imports
import type { FC } from 'react';

type StatsWidgetProps = {
	fieldName: string | React.ReactNode;
	title?: string | number | React.ReactNode;
	subTitle?: string | React.ReactNode;
	accentText?: string | React.ReactNode;
};

const StatsWidget: FC<StatsWidgetProps> = ({
	fieldName,
	title,
	subTitle,
	accentText,
}) => {
	return (
		<>
			<div>{fieldName}</div>
			<div>{title}</div>
			<div>
				{subTitle && <span>{subTitle} </span>}
				{accentText && <span> ({accentText})</span>}
			</div>
		</>
	);
};

export default StatsWidget;
