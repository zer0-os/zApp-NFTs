import { FC } from 'react';

import { useWeb3 } from '../../lib/hooks/useWeb3';
import { BasicModalProps } from '../../lib/types/ui';

import { DomainSettingsForm, DomainSettingsFormProps } from '.';
import { ConnectWallet } from '../ui/ConnectWallet';
import { Modal } from '@zero-tech/zui/components';

import styles from './DomainSettingsModal.module.scss';

export interface DomainSettingsModalProps extends BasicModalProps {
	zna: string;
	onClose: () => void;
}

export const DomainSettingsModal: FC<DomainSettingsModalProps> = ({
	zna,
	open,
	onClose,
	onOpenChange,
	...props
}) => {
	const { account } = useWeb3();

	return (
		<Modal
			className={styles.Container}
			{...props}
			open={open}
			onOpenChange={onOpenChange}
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
	zna: DomainSettingsFormProps['zna'];
	onClose: DomainSettingsFormProps['onClose'];
}

const ModalContent = ({ account, zna, onClose }: ModalContentProps) => {
	return account ? (
		<DomainSettingsForm zna={zna} onClose={onClose} />
	) : (
		<ConnectWallet message={'Connect your wallet to view domain settings.'} />
	);
};
