import { FC, useState } from 'react';

import { useWeb3 } from '../../../lib/hooks/useWeb3';
import { BasicModalProps } from '../../../lib/types/ui';

import { PlaceBidForm } from '..';
import { ConnectWallet } from '../../ui/ConnectWallet';
import { Modal } from '@zero-tech/zui/components';

import styles from './PlaceBidModal.module.scss';

export interface PlaceBidModalProps extends BasicModalProps {
	domainId: string;
	tokenBalance: string;
}

export const PlaceBidModal: FC<PlaceBidModalProps> = ({
	domainId,
	tokenBalance,
	...modalProps
}) => {
	const { account } = useWeb3();

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const onClose = () => {
		setIsModalOpen(false);
	};

	const content = account ? (
		<PlaceBidForm
			domainId={domainId}
			tokenBalance={tokenBalance}
			onClose={onClose}
		/>
	) : (
		<ConnectWallet message={'Connect your wallet to place a bid.'} />
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
