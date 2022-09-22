import { FC, useState } from 'react';

import { BasicModalProps } from '../../lib/types/ui';

import { Modal } from '@zero-tech/zui/components';
import { CreateDAOForm } from './';

export interface CreateDAOModalProps extends BasicModalProps {
	domainName: string;
}

export const CreateDAOModal: FC<CreateDAOModalProps> = ({ domainName, ...props }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = (): void => {
		setIsOpen(false);
	}

	const handleOpenChange = (open: boolean): void => {
		if (!open) return;
		setIsOpen(true);
	}

	return (
		<Modal {...props} open={isOpen} onOpenChange={handleOpenChange}>
			<CreateDAOForm domainName={domainName} onClose={handleClose} />
		</Modal>
	);
};
