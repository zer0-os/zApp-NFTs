import { FC, useState } from 'react';

import { BasicModalProps } from '../../lib/types/ui';

import { Modal } from '@zero-tech/zui/components';
import { CreateTokenForm } from './';

export interface CreateTokenModalProps extends BasicModalProps {
	domainName: string;
}

export const CreateTokenModal: FC<CreateTokenModalProps> = ({
	domainName,
	...props
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const onOpenChange = (open: boolean): void => {
		if (!open) return;
		setIsOpen(true);
	};

	const onClose = (): void => {
		setIsOpen(false);
	};

	return (
		<Modal {...props} open={isOpen} onOpenChange={onOpenChange}>
			<CreateTokenForm domainName={domainName} onClose={onClose} />
		</Modal>
	);
};
