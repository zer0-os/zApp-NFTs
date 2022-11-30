import { FC, useState } from 'react';

import { useWeb3 } from '../../../lib/hooks/useWeb3';
import { BasicModalProps } from '../../../lib/types/ui';

import { CancelBidForm } from '..';
import { ConnectWallet } from '../../ui/ConnectWallet';
import { Modal } from '@zero-tech/zui/components';

import styles from './CancelBidModal.module.scss';

export interface CancelBidModalProps extends BasicModalProps {
	zna: string;
}

export const CancelBidModal: FC<CancelBidModalProps> = ({
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
	zna: CancelBidModalProps['zna'];
	onClose: () => void;
}

const ModalContent = ({ account, zna, onClose }: ModalContentProps) => {
	return account ? (
		<CancelBidForm zna={zna} onClose={onClose} />
	) : (
		<ConnectWallet message={'Connect your wallet to cancel a bid.'} />
	);
};
