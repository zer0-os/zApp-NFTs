import { ReactNode } from 'react';

import styles from './Action.module.scss';

type ActionProps = {
	label: string;
	amountToken: string | number;
	amountUsd: string | number;
	buttonComponent: ReactNode;
};

export const Action = ({
	label,
	amountToken,
	amountUsd,
	buttonComponent,
}: ActionProps) => (
	<div className={styles.Container}>
		<span className={styles.Label}>{label}</span>
		<span className={styles.TokenValue}>{amountToken}</span>
		<span className={styles.AmountUsd}>{amountUsd}</span>
		<div className={styles.Button}>{buttonComponent}</div>
	</div>
);
