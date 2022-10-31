import { FC, useState } from 'react';

import { useWeb3 } from '../../../lib/hooks/useWeb3';
import { BasicModalProps } from '../../../lib/types/ui';

import { ViewBids } from '../ViewBids';
import { ConnectWallet } from '../../ui/ConnectWallet';
import { Modal } from '@zero-tech/zui/components';

export interface ViewBidsModalProps extends BasicModalProps {
	zna: string;
}

export const ViewBidsModal: FC<ViewBidsModalProps> = ({
	zna,
	...modalProps
}) => {
	const { account } = useWeb3();

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const content = account ? (
		<ViewBids zna={zna} />
	) : (
		<ConnectWallet message={'Connect your wallet to place a bid.'} />
	);

	return (
		<Modal
			open={isModalOpen}
			onOpenChange={(isOpen: boolean) => setIsModalOpen(isOpen)}
			{...modalProps}
		>
			{content}
		</Modal>
	);
};
