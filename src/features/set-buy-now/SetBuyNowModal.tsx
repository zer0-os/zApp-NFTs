import { FC } from 'react';

import { BasicModalProps } from '../../lib/types/ui';

import { Modal } from '@zero-tech/zui/components';

import { SetBuyNow } from './SetBuyNow';

import styles from './SetBuyNow.module.scss';

export interface SetBuyNowModalProps extends BasicModalProps {}

export const SetBuyNowModal: FC<SetBuyNowModalProps> = ({ ...modalProps }) => (
	<Modal className={styles.Modal} {...modalProps}>
		<SetBuyNow />
	</Modal>
);
