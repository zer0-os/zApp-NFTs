import { FC, useState } from 'react';

import { useWeb3 } from '../../../lib/hooks/useWeb3';
import { BasicModalProps } from '../../../lib/types/ui';

import { AcceptBidForm, AcceptBidFormProps } from '..';
import { ConnectWallet } from '../../ui/ConnectWallet';
import { Modal } from '@zero-tech/zui/components';

import styles from './AcceptBidModal.module.scss';

export interface AcceptBidModalProps extends BasicModalProps {
	zna: ModalContentProps['zna'];
	bid: ModalContentProps['bid'];
}

export const AcceptBidModal: FC<AcceptBidModalProps> = ({
	zna,
	bid,
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
			<ModalContent account={account} zna={zna} bid={bid} onClose={onClose} />
		</Modal>
	);
};

/*******************
 * ModalContent
 *******************/

interface ModalContentProps {
	account: string;
	zna: AcceptBidFormProps['zna'];
	bid: AcceptBidFormProps['bid'];
	onClose: AcceptBidFormProps['onClose'];
}

const ModalContent = ({ account, zna, bid, onClose }: ModalContentProps) => {
	return account ? (
		<AcceptBidForm zna={zna} bid={bid} onClose={onClose} />
	) : (
		<ConnectWallet message={'Connect your wallet to accept a bid.'} />
	);
};
