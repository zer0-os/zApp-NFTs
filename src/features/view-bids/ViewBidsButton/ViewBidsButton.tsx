import { FC } from 'react';

import { ViewBidsModal, ViewBidsModalProps } from '../ViewBidsModal';
import { IconLinkExternal1 } from '@zero-tech/zui/components/Icons';

import styles from './ViewBidsButton.module.scss';

interface ViewBidsButtonProps {
	zna: string;
	variant?: 'primary' | 'text';
}

export const ViewBidsButton: FC<ViewBidsButtonProps> = ({
	zna,
	variant = 'primary',
}) => {
	const triggerVariant: ViewBidsModalProps['trigger'] =
		variant === 'text' ? textButton : 'View Bids';

	return <ViewBidsModal zna={zna} trigger={triggerVariant} />;
};

/**************
 * textButton
 **************/

const textButton = (
	<div className={styles.Container}>
		<p className={styles.TextButton}>{'View All Bids'}</p>
		<IconLinkExternal1 className={styles.Icon} size={'1.15rem'} isFilled />
	</div>
);
