//- React Imports
import { FC } from 'react';

//- Style Imports
import styles from './TokenSummaryField.module.scss';
import classnames from 'classnames';
const cx = classnames.bind(styles);

interface TokenSummaryFieldProps {
	className?: string;
	label: string;
	value: string | number;
}

export const TokenSummaryField: FC<TokenSummaryFieldProps> = ({
	className = '',
	label,
	value,
}) => (
	<div className={cx(styles.TokenSummaryField, className)}>
		<p className={styles.TokenSummaryFieldLabel}>{label}</p>
		<p className={styles.TokenSummaryFieldValue}>{value}</p>
	</div>
);
