import { FC, useState } from 'react';

import { useWeb3 } from '../../../lib/hooks/useWeb3';
import { BasicModalProps } from '../../../lib/types/ui';

import { CancelBidForm, CancelBidFormProps } from '..';
import { ConnectWallet } from '../../ui/ConnectWallet';
import { Modal } from '@zero-tech/zui/components';

import styles from './CancelBidModal.module.scss';

export interface CancelBidModalProps extends BasicModalProps {
	zna: ModalContentProps['zna'];
	tokenBalance: ModalContentProps['tokenBalance'];
}

export const CancelBidModal: FC<CancelBidModalProps> = ({
	zna,
	tokenBalance,
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
			<ModalContent
				account={account}
				zna={zna}
				tokenBalance={tokenBalance}
				onClose={onClose}
			/>
		</Modal>
	);
};

/*******************
 * ModalContent
 *******************/

interface ModalContentProps {
	account: string;
	zna: CancelBidFormProps['zna'];
	tokenBalance: CancelBidFormProps['tokenBalance'];
	onClose: CancelBidFormProps['onClose'];
}

const ModalContent = ({
	account,
	zna,
	tokenBalance,
	onClose,
}: ModalContentProps) => {
	return account ? (
		<CancelBidForm zna={zna} tokenBalance={tokenBalance} onClose={onClose} />
	) : (
		<ConnectWallet message={'Connect your wallet to cancel a bid.'} />
	);
};
