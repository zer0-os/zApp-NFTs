import { FC, useState } from 'react';

import { useWeb3 } from '../../../lib/hooks/useWeb3';
import { BasicModalProps } from '../../../lib/types/ui';

import { ViewBids } from '../ViewBids';
import { ConnectWallet } from '../../ui/ConnectWallet';
import { Modal } from '@zero-tech/zui/components';

import styles from './ViewBidsModal.module.scss';

export interface ViewBidsModalProps extends BasicModalProps {
	zna: string;
}

export const ViewBidsModal: FC<ViewBidsModalProps> = ({
	zna,
	...modalProps
}) => {
	const { account } = useWeb3();

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	return (
		<Modal
			className={styles.Container}
			open={isModalOpen}
			onOpenChange={(isOpen: boolean) => setIsModalOpen(isOpen)}
			{...modalProps}
		>
			<ModalContent zna={zna} account={account} />
		</Modal>
	);
};

/*******************
 * ModalContent
 *******************/

interface ModalContentProps {
	zna: ViewBidsModalProps['zna'];
	account: string;
}

const ModalContent = ({ zna, account }: ModalContentProps) => {
	return account ? (
		<ViewBids zna={zna} />
	) : (
		<ConnectWallet message={'Connect your wallet to view bids.'} />
	);
};
