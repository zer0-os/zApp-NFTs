import { FC } from 'react';

import { BasicModalProps } from '../../lib/types/ui';

import { TransferOwnershipForm } from './TransferOwnershipForm';
import { Modal } from '@zero-tech/zui/components';

import styles from './TransferOwnership.module.scss';

export interface TransferOwnershipModalProps extends BasicModalProps {
	domainId: string;
	domainName: string;
	domainTitle: string;
	domainOwner: string;
	domainCreator: string;
	onClose: () => void;
}

export const TransferOwnershipModal: FC<TransferOwnershipModalProps> = ({
	domainId,
	domainName,
	domainTitle,
	domainOwner,
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
				domainOwner={domainOwner}
				domainCreator={domainCreator}
				onClose={onClose}
			/>
		</Modal>
	);
};
