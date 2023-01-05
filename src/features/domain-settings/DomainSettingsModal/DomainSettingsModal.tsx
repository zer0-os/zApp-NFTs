import { FC, useState } from 'react';

import { useWeb3 } from '../../../lib/hooks/useWeb3';
import { BasicModalProps } from '../../../lib/types/ui';

import { ConnectWallet } from '../../ui/ConnectWallet';
import { Modal } from '@zero-tech/zui/components';

import styles from './DomainSettingsModal.module.scss';

export interface DomainSettingsModalProps extends BasicModalProps {
	zna: string;
	onClose: () => void;
}

export const DomainSettingsModal: FC<DomainSettingsModalProps> = ({
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
	zna: DomainSettingsModalProps['zna'];
	onClose: DomainSettingsModalProps['onClose'];
}

const ModalContent = ({ account, zna, onClose }: ModalContentProps) => {
	return account ? (
		<>Domain Settings</>
	) : (
		<ConnectWallet message={'Connect your wallet to view domain settings.'} />
	);
};
