import { FC } from 'react';

import { useCancelBidData } from '../useCancelBidData';

import { CancelBidModal, CancelBidModalProps } from '..';

import styles from './CancelBidButton.module.scss';

interface CancelBidButtonProps {
	zna: CancelBidModalProps['zna'];
	variant?: 'primary' | 'text';
}

export const CancelBidButton: FC<CancelBidButtonProps> = ({
	zna,
	variant = 'primary',
}) => {
	const { balanceAsString } = useCancelBidData(zna);

	const textButton = <p className={styles.TextButton}>{'Cancel Bid'}</p>;

	const triggerVariant: CancelBidModalProps['trigger'] =
		variant === 'text' ? textButton : 'Cancel Bid';

	return (
		<CancelBidModal
			zna={zna}
			tokenBalance={balanceAsString}
			trigger={triggerVariant}
		/>
	);
};
