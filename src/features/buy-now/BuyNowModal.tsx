import { FC } from 'react';

import { BasicModalProps } from '../../lib/types/ui';

import { Modal } from '@zero-tech/zui/components';

import { BuyNow } from './BuyNow';

import styles from './BuyNow.module.scss';

export interface BuyNowModalProps extends BasicModalProps {}

export const BuyNowModal: FC<BuyNowModalProps> = ({ ...modalProps }) => (
	<Modal className={styles.Modal} {...modalProps}>
		<BuyNow />
	</Modal>
);
