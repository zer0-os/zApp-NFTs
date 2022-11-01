import { FC } from 'react';

import { ViewBidsModal, ViewBidsModalProps } from '../ViewBidsModal';
import { IconLinkExternal1 } from '@zero-tech/zui/components/Icons';

import styles from './ViewBidsButton.module.scss';

interface ViewBidsButtonProps {
	zna: ViewBidsModalProps['zna'];
	variant?: 'primary' | 'text';
}

export const ViewBidsButton: FC<ViewBidsButtonProps> = ({
	zna,
	variant = 'primary',
}) => {
	const triggerVariant: ViewBidsModalProps['trigger'] =
		variant === 'text' ? <TextButton /> : 'View Bids';

	return <ViewBidsModal zna={zna} trigger={triggerVariant} />;
};

/*******************
 * TextButton
 *******************/

const TextButton = () => {
	return (
		<div className={styles.Container}>
			<p className={styles.TextButton}>{'View All Bids'}</p>
			<IconLinkExternal1 className={styles.Icon} size={'1.15rem'} isFilled />
		</div>
	);
};
