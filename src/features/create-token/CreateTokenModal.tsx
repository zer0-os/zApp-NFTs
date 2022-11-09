import { FC } from 'react';

import { BasicModalProps } from '../../lib/types/ui';

import { Modal } from '@zero-tech/zui/components';
import { CreateTokenForm } from './';

export interface CreateTokenModalProps extends BasicModalProps {
	zna: string;
	onClose: () => string;
}

export const CreateTokenModal: FC<CreateTokenModalProps> = ({
	zna,
	open,
	onClose,
	onOpenChange,
	...props
}) => {
	return (
		<Modal {...props} open={open} onOpenChange={onOpenChange}>
			<CreateTokenForm zna={zna} onClose={onClose} />
		</Modal>
	);
};
