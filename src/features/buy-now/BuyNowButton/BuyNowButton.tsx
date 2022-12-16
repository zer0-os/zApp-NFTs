import { FC } from 'react';

import { BuyNowModal, BuyNowModalProps } from '..';
import { IconLinkExternal1 } from '@zero-tech/zui/components/Icons';

import styles from './BuyNowButton.module.scss';

interface BuyNowButtonProps {
	zna: string;
	variant?: 'primary' | 'text';
}

export const BuyNowButton: FC<BuyNowButtonProps> = ({
	zna,
	variant = 'primary',
}) => {
	const triggerVariant: BuyNowModalProps['trigger'] =
		variant === 'text' ? textButton : 'Buy now';

	return <BuyNowModal zna={zna} trigger={triggerVariant} />;
};

/**************
 * textButton
 **************/

const textButton = (
	<div className={styles.Container}>
		<p className={styles.TextButton}>{'Buy now'}</p>
		<IconLinkExternal1 className={styles.Icon} size={'1.15rem'} isFilled />
	</div>
);
