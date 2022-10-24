import { FC } from 'react';

import { ViewBidsModal } from './ViewBidsModal';
import { Button } from '@zero-tech/zui/components';
import { IconLinkExternal1 } from '@zero-tech/zui/components/Icons';

import styles from './ViewBidsButton.module.scss';

interface ViewBidsButtonProps {
	variant?: 'primary' | 'text';
}

export const ViewBidsButton: FC<ViewBidsButtonProps> = ({
	variant = 'primary',
}) => {
	const textButton = (
		<div className={styles.Container}>
			<p className={styles.TextButton}>View All Bids</p>
			<IconLinkExternal1 className={styles.Icon} size={'1.15rem'} isFilled />
		</div>
	);

	return <ViewBidsModal trigger={variant ? textButton : 'View Bids'} />;
};
