import { FC, useState } from 'react';

import { useWeb3 } from '../../../lib/hooks/useWeb3';
import { BasicModalProps } from '../../../lib/types/ui';

import { ConnectWallet } from '../../ui/ConnectWallet';
import { Modal } from '@zero-tech/zui/components';

import styles from './DomainSettingsModal.module.scss';

export interface DomainSettingsModalProps extends BasicModalProps {
	zna: string;
}

export const DomainSettingsModal: FC<DomainSettingsModalProps> = ({
	zna,
	...modalProps
}) => {
	const { account } = useWeb3();

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const onClose = () => {
		setIsModalOpen(false);
	};

	return (
		<Modal
			className={styles.Container}
			open={isModalOpen}
			onOpenChange={(isOpen: boolean) => setIsModalOpen(isOpen)}
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
	onClose: () => void;
}

const ModalContent = ({ account, zna, onClose }: ModalContentProps) => {
	return account ? (
		// <DomainSettingsForm zna={zna} onClose={onClose} />
		<>Domain Settings</>
	) : (
		<ConnectWallet message={'Connect your wallet to view domain settings.'} />
	);
};
