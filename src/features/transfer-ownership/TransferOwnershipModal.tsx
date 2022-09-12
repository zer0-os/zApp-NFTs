import { FC } from 'react';

import { BasicModalProps } from '../../lib/types/ui';

import { TransferOwnershipForm } from './TranferOwnershipForm';
import { Modal } from '@zero-tech/zui/src/components';

import styles from './TransferOwnership.module.scss';

export interface TransferOwnershipModalProps extends BasicModalProps {
	domainId: string;
}

export const TransferOwnershipModal: FC<TransferOwnershipModalProps> = ({
	domainId,
	...modalProps
}) => (
	<Modal {...modalProps} className={styles.Container}>
		<TransferOwnershipForm domainId={domainId} />
	</Modal>
);
