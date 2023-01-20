import { FC } from 'react';

import { TextStack } from '@zero-tech/zui/components';

import styles from './DAOSummaryField.module.scss';
import classNames from 'classnames';

interface DAOSummaryFieldProps {
	className?: string;
	label: string;
	value: string | number;
}

export const DAOSummaryField: FC<DAOSummaryFieldProps> = ({
	className,
	label,
	value,
}) => (
	<TextStack
		className={classNames(styles.Field, className)}
		label={label}
		primaryText={value.toString()}
		secondaryText=""
	/>
);
