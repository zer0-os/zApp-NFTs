import { FC, useState } from 'react';

import { useWeb3 } from '../../../lib/hooks/useWeb3';
import { BasicModalProps } from '../../../lib/types/ui';

import { SetBuyNowForm } from '..';
import { ConnectWallet } from '../../ui/ConnectWallet';
import { Modal } from '@zero-tech/zui/components';

import styles from './SetBuyNowModal.module.scss';

export interface SetBuyNowModalProps extends BasicModalProps {
	zna: string;
}

export const SetBuyNowModal: FC<SetBuyNowModalProps> = ({
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
	zna: SetBuyNowModalProps['zna'];
	onClose: () => void;
}

const ModalContent = ({ account, zna, onClose }: ModalContentProps) => {
	return account ? (
		<SetBuyNowForm zna={zna} onClose={onClose} />
	) : (
		<ConnectWallet message={'Connect your wallet to set buy now.'} />
	);
};
