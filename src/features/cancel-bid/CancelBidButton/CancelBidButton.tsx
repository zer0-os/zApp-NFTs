import { FC } from 'react';

import { CancelBidModal, CancelBidModalProps } from '..';
import { IconLinkExternal1 } from '@zero-tech/zui/components/icons';

import styles from './CancelBidButton.module.scss';

interface CancelBidButtonProps {
	zna: string;
	variant?: 'primary' | 'text';
}

export const CancelBidButton: FC<CancelBidButtonProps> = ({
	zna,
	variant = 'primary',
}) => {
	const triggerVariant: CancelBidModalProps['trigger'] =
		variant === 'text' ? textButton : 'Cancel Bid';

	return <CancelBidModal zna={zna} trigger={triggerVariant} />;
};

/**************
 * textButton
 **************/

const textButton = (
	<div className={styles.Container}>
		<p className={styles.TextButton}>{'Cancel Bid'}</p>
		<IconLinkExternal1 className={styles.Icon} size={'1.15rem'} isFilled />
	</div>
);
