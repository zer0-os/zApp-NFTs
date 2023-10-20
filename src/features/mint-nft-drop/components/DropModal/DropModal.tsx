import React from 'react';

import { DropForm } from '../DropForm';

import { useWeb3 } from '../../../../lib/hooks';

import { Modal } from '@zero-tech/zui';
import { BigNumber } from 'ethers';

export interface MintDropNFTProps {
	onClose: () => void;
}

export const DropModal = ({ onClose }: MintDropNFTProps) => {
	const { account } = useWeb3();

	return (
		<Modal open={true} onOpenChange={onClose}>
			<DropForm
				onClose={onClose}
				onFinish={onClose}
				pricePerNFT={BigNumber.from(1000)}
				userId={account}
			/>
		</Modal>
	);
};
