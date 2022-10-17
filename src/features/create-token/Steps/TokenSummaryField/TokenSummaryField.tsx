//- React Imports
import { FC } from 'react';

//- Style Imports
import styles from './TokenSummaryField.module.scss';
import classNames from 'classnames';

interface TokenSummaryFieldProps {
	className?: string;
	label: string;
	value: string | number;
}

export const TokenSummaryField: FC<TokenSummaryFieldProps> = ({
	className,
	label,
	value,
}) => (
	<div className={classNames(styles.Field, className)}>
		<p className={styles.FieldLabel}>{label}</p>
		<p className={styles.FieldValue}>{value}</p>
	</div>
);
