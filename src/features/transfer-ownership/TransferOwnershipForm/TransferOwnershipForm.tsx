import { FC, ReactNode } from 'react';

import { useTransferOwnershipForm } from './hooks/useTransferOwnershipForm';
import { Step } from './TransferOwnershipForm.constants';

import { Confirm, Complete, Details, Transaction } from '../FormSteps';
import { Wizard } from '@zero-tech/zui/components';

interface TransferOwnershipFormProps {
	domainId: string;
	onClose: () => void;
}

export const TransferOwnershipForm: FC<TransferOwnershipFormProps> = ({
	domainId,
	onClose,
}) => {
	const { step, error, onConfirmInput, onConfirmTransaction } =
		useTransferOwnershipForm(domainId);

	let content: ReactNode;

	switch (step) {
		case Step.DETAILS:
			content = (
				<Details domainId={domainId} error={error} onConfirm={onConfirmInput} />
			);
			break;
		case Step.CONFIRM:
			content = (
				<Confirm
					errorMessage={error}
					onClose={onClose}
					onConfirm={onConfirmTransaction}
				/>
			);
			break;
		case Step.TRANSACTION_APPROVAL:
			content = <Transaction />;
			break;
		case Step.TRANSACTION_IN_PROGRESS:
			content = <Transaction isTransferring />;
			break;
		case Step.COMPLETE:
			content = <Complete onClose={onClose} />;
			break;
	}

	return (
		<form>
			<Wizard.Container header="Transfer Ownership">{content}</Wizard.Container>
		</form>
	);
};
