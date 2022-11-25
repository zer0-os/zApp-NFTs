import { FC } from 'react';

import { useWeb3 } from '../../lib/hooks/useWeb3';
import { BasicModalProps } from '../../lib/types/ui';

import { CreateTokenForm, CreateTokenFormProps } from './';
import { ConnectWallet } from '../ui/ConnectWallet';
import { Modal } from '@zero-tech/zui/components';

export interface CreateTokenModalProps extends BasicModalProps {
	zna: string;
	onClose: () => void;
}

export const CreateTokenModal: FC<CreateTokenModalProps> = ({
	zna,
	open,
	onClose,
	onOpenChange,
	...props
}) => {
	const { account } = useWeb3();

	return (
		<Modal {...props} open={open} onOpenChange={onOpenChange}>
			<ModalContent account={account} zna={zna} onClose={onClose} />
		</Modal>
	);
};

/*******************
 * ModalContent
 *******************/

interface ModalContentProps {
	account: string;
	zna: CreateTokenFormProps['zna'];
	onClose: CreateTokenFormProps['onClose'];
}

const ModalContent = ({ account, zna, onClose }: ModalContentProps) => {
	return account ? (
		<CreateTokenForm zna={zna} onClose={onClose} />
	) : (
		<ConnectWallet message={'Connect your wallet to create a token.'} />
	);
};
