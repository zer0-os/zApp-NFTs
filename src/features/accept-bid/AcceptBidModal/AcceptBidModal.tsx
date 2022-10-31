import { FC, useState } from 'react';

import { useWeb3 } from '../../../lib/hooks/useWeb3';
import { BasicModalProps } from '../../../lib/types/ui';
import { Bid } from '@zero-tech/zauction-sdk';

import { AcceptBidForm } from '..';
import { ConnectWallet } from '../../ui/ConnectWallet';
import { Modal } from '@zero-tech/zui/components';

import styles from './AcceptBidModal.module.scss';

export interface AcceptBidModalProps extends BasicModalProps {
	zna: string;
	bid: Bid;
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

	const content = account ? (
		<AcceptBidForm zna={zna} bid={bid} onClose={onClose} />
	) : (
		<ConnectWallet message={'Connect your wallet to accept a bid.'} />
	);

	return (
		<Modal
			className={styles.Container}
			open={isModalOpen}
			onOpenChange={(isOpen: boolean) => setIsModalOpen(isOpen)}
			{...modalProps}
		>
			{content}
		</Modal>
	);
};
