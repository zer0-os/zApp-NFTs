import { FC } from 'react';

import { useWeb3 } from '../../../lib/hooks/useWeb3';
import { BasicModalProps } from '../../../lib/types/ui';

import { TransferOwnershipForm } from '../TransferOwnershipForm';
import { ConnectWallet } from '../../ui/ConnectWallet';
import { Modal } from '@zero-tech/zui/components';

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
}) => {
	const { account } = useWeb3();

	const content = account ? (
		<TransferOwnershipForm zna={zna} onClose={onClose} />
	) : (
		<ConnectWallet message={'Connect your wallet to place a bid.'} />
	);

	return (
		<Modal
			className={styles.Container}
			open={open}
			onOpenChange={onOpenChange}
			trigger={trigger}
		>
			{content}
		</Modal>
	);
};
