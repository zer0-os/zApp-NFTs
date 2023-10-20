import { FC } from 'react';

import { useWeb3 } from '../../../lib/hooks/useWeb3';
import { BasicModalProps } from '../../../lib/types/ui';

import { TransferOwnershipForm } from '../TransferOwnershipForm';
import { ConnectWallet } from '../../ui/ConnectWallet';
import { Modal } from '@zero-tech/zui';

import styles from './TransferOwnershipModal.module.scss';

export interface TransferOwnershipModalProps extends BasicModalProps {
	zna: string;
	onClose: () => void;
}

export const TransferOwnershipModal: FC<TransferOwnershipModalProps> = ({
	zna,
	open,
	trigger,
	onClose,
	onOpenChange,
	...modalProps
}) => {
	const { account } = useWeb3();

	return (
		<Modal
			className={styles.Container}
			open={open}
			onOpenChange={onOpenChange}
			{...modalProps}
		>
			<ModalContent account={account} zna={zna} onClose={onClose} />
		</Modal>
	);
};

/*******************
 * ModalContent
 *******************/

interface ModalContentProps {
	account: string;
	zna: TransferOwnershipModalProps['zna'];
	onClose: TransferOwnershipModalProps['onClose'];
}

const ModalContent = ({ account, zna, onClose }: ModalContentProps) => {
	return account ? (
		<TransferOwnershipForm zna={zna} onClose={onClose} />
	) : (
		<ConnectWallet message={'Connect your wallet to transfer ownership.'} />
	);
};
