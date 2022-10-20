import { FC } from 'react';

import { BasicModalProps } from '../../lib/types/ui';

import { Modal } from '@zero-tech/zui/components';

import { PlaceBid } from './PlaceBid';

import styles from './PlaceBid.module.scss';

export interface PlaceBidModalProps extends BasicModalProps {}

export const PlaceBidModal: FC<PlaceBidModalProps> = ({ ...modalProps }) => (
	<Modal className={styles.Modal} {...modalProps}>
		<PlaceBid />
	</Modal>
);
