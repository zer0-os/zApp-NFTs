import { FC } from 'react';

import { BasicModalProps } from '../../lib/types/ui';

import { Modal } from '@zero-tech/zui/components';

import { CancelBid } from './CancelBid';

import styles from './CancelBid.module.scss';

export interface CancelBidModalProps extends BasicModalProps {}

export const CancelBidModal: FC<CancelBidModalProps> = ({ ...modalProps }) => (
	<Modal className={styles.Modal} {...modalProps}>
		<CancelBid />
	</Modal>
);
