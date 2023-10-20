import { FC, useState } from 'react';

import { BasicModalProps } from '../../lib/types/ui';

import { Modal } from '@zero-tech/zui';
import { CreateDAOForm } from './';

export interface CreateDAOModalProps extends BasicModalProps {
	domainName: string;
}

export const CreateDAOModal: FC<CreateDAOModalProps> = ({
	domainName,
	...props
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const onClose = (): void => {
		setIsOpen(false);
	};

	const onOpenChange = (open: boolean): void => {
		if (!open) return;
		setIsOpen(true);
	};

	return (
		<Modal {...props} open={isOpen} onOpenChange={onOpenChange}>
			<CreateDAOForm domainName={domainName} onClose={onClose} />
		</Modal>
	);
};
