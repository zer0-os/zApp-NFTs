import { FC, ReactNode } from 'react';

import {
	useTransferOwnershipForm,
	TransferOwnershipFormStep as Step,
} from './useTransferOwnershipForm';

import { Confirm, WaitingForWallet } from './TransferOwnershipFormSteps';
import { FormInputs } from '../ui/FormInputs';
import { Wizard } from '@zero-tech/zui/src/components';

interface TransferOwnershipProps {
	domainId: string;
}

export const TransferOwnershipForm: FC<TransferOwnershipProps> = ({
	domainId,
}) => {
	const { step, error, helperText, onConfirmAddressInput, onConfirmTransfer } =
		useTransferOwnershipForm(domainId);

	let content: ReactNode;

	switch (step) {
		case Step.ADDRESS_INPUT:
			content = (
				<FormInputs
					action={'transfer'}
					label={'Ethereum Wallet'}
					error={Boolean(helperText)}
					message={error && { text: error, isError: true }}
					helperText={helperText}
					instructionText={'Enter recipient address:'}
					onSubmit={onConfirmAddressInput}
				/>
			);
			break;
		case Step.CONFIRM:
			content = <Confirm onConfirm={onConfirmTransfer} />;
			break;
		case Step.WAITING_FOR_WALLET:
			content = <WaitingForWallet />;
			break;
	}

	return (
		<form>
			<Wizard.Container header="Transfer Ownership">{content}</Wizard.Container>
		</form>
	);
};
