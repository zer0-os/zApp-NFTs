import { FC } from 'react';

import { BasicModalProps } from '../../lib/types/ui';

import { TransferOwnershipForm } from './TranferOwnershipForm';
import { Modal } from '@zero-tech/zui/components';

import styles from './TransferOwnership.module.scss';

export interface TransferOwnershipModalProps extends BasicModalProps {
	domainId: string;
	domainName: string;
	domainTitle: string;
	domainCreator: string;
	onClose: () => void;
}

export const TransferOwnershipModal: FC<TransferOwnershipModalProps> = ({
	domainId,
	domainName,
	domainTitle,
	domainCreator,
	onClose,
	...modalProps
}) => {
	return (
		<Modal {...modalProps} className={styles.Container}>
			<TransferOwnershipForm
				domainId={domainId}
				domainName={domainName}
				domainTitle={domainTitle}
				domainCreator={domainCreator}
				onClose={onClose}
			/>
		</Modal>
	);
};