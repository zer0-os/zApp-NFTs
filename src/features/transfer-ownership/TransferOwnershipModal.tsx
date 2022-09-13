import { FC } from 'react';

import { BasicModalProps } from '../../lib/types/ui';

import { TransferOwnershipForm } from './TranferOwnershipForm';
import { Modal } from '@zero-tech/zui/components';

import styles from './TransferOwnership.module.scss';

export interface TransferOwnershipModalProps extends BasicModalProps {
	domainId: string;
}

export const TransferOwnershipModal: FC<TransferOwnershipModalProps> = ({
	domainId,
	...modalProps
}) => {
	const onClose = () => console.log('onClose');

	return (
		<Modal {...modalProps} className={styles.Container}>
			<TransferOwnershipForm domainId={domainId} onClose={onClose} />
		</Modal>
	);
};
