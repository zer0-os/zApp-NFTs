import { FC } from 'react';

import { CancelBidModal, CancelBidModalProps } from '..';

import styles from './CancelBidButton.module.scss';

interface CancelBidButtonProps {
	zna: string;
	trigger: string;
	variant?: 'primary' | 'text';
}

export const CancelBidButton: FC<CancelBidButtonProps> = ({
	zna,
	trigger,
	variant = 'primary',
}) => {
	const triggerVariant =
		variant === 'text' ? (
			<p className={styles.TextButton}>{trigger}</p>
		) : (
			trigger
		);

	return <CancelBidModal zna={zna} trigger={triggerVariant} />;
};
