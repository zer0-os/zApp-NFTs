import { FC, ReactNode } from 'react';

import { useTransferOwnershipForm } from './useTransferOwnershipForm';
import { TransferOwnershipFormStep as Step } from './TransferOwnership.constants';

import { Confirm, Complete, Details, Transaction } from './FormSteps';
import { Wizard } from '@zero-tech/zui/components';

interface TransferOwnershipProps {
	domainId: string;
	domainName: string;
	domainTitle: string;
	domainCreator: string;
	onClose: () => void;
}

export const TransferOwnershipForm: FC<TransferOwnershipProps> = ({
	domainId,
	domainName,
	domainTitle,
	domainCreator,
	onClose,
}) => {
	const {
		step,
		error,
		helperText,
		setHelperText,
		onConfirmAddressInput,
		onConfirmTransfer,
	} = useTransferOwnershipForm(domainId);

	let content: ReactNode;

	switch (step) {
		case Step.DETAILS:
			content = (
				<Details
					domainName={domainName}
					domainTitle={domainTitle}
					domainCreator={domainCreator}
					helperText={helperText}
					setHelperText={setHelperText}
					onConfirm={onConfirmAddressInput}
				/>
			);
			break;
		case Step.CONFIRM:
			content = (
				<Confirm
					onConfirm={onConfirmTransfer}
					onClose={onClose}
					errorMessage={error}
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
