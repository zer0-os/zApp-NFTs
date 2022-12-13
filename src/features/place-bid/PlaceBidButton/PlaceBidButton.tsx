import { FC, ReactNode } from 'react';

import { PlaceBidModal } from '..';

import styles from './PlaceBidButton.module.scss';

type PlaceBidButtonProps = {
	zna: string;
	trigger: ReactNode;
	variant?: 'primary' | 'text';
};

export const PlaceBidButton: FC<PlaceBidButtonProps> = ({
	zna,
	trigger,
	variant,
}) => {
	const triggerVariant =
		variant === 'text' ? (
			<p className={styles.TextButton}>{trigger}</p>
		) : (
			trigger
		);

	return <PlaceBidModal trigger={triggerVariant} zna={zna} />;
};
