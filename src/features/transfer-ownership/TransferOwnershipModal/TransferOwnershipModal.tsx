import { FC } from 'react';

import { BasicModalProps } from '../../../lib/types/ui';

import { TransferOwnershipForm } from '../TransferOwnershipForm';
import { Modal } from '@zero-tech/zui/components';

import styles from './TransferOwnershipModal.module.scss';

export interface TransferOwnershipModalProps extends BasicModalProps {
	domainId: string;
	onClose: () => void;
}

export const TransferOwnershipModal: FC<TransferOwnershipModalProps> = ({
	domainId,
	onClose,
	...modalProps
}) => {
	return (
		<Modal {...modalProps} className={styles.Container}>
			<TransferOwnershipForm domainId={domainId} onClose={onClose} />
		</Modal>
	);
};
