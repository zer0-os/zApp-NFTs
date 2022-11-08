import { FC } from 'react';

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
	<div className={classNames(styles.Field, className)}>
		<p className={styles.FieldLabel}>{label}</p>
		<p className={styles.FieldValue}>{value}</p>
	</div>
);