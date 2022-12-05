import { FC, ReactNode } from 'react';

import { ViewBidsModal } from '../ViewBidsModal';
import { IconLinkExternal1 } from '@zero-tech/zui/components/Icons';

import styles from './ViewBidsButton.module.scss';

interface ViewBidsButtonProps {
	zna: string;
	trigger?: ReactNode;
	variant?: 'primary' | 'text';
}

export const ViewBidsButton: FC<ViewBidsButtonProps> = ({
	zna,
	trigger,
	variant = 'primary',
}) => {
	const triggerVariant = variant === 'text' ? textButton : trigger;

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
