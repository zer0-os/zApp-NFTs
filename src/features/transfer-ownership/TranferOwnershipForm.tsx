import { FC, ReactNode } from 'react';

import {
	useTransferOwnershipForm,
	TransferOwnershipFormStep as Step,
} from './useTransferOwnershipForm';

import {
	Complete,
	Confirm,
	Processing,
	WaitingForWallet,
} from './TransferOwnershipFormSteps';
import { FormInputs } from '../ui/FormInputs';
import { Wizard } from '@zero-tech/zui/src/components';

interface TransferOwnershipProps {
	domainId: string;
}

export const TransferOwnershipForm: FC<TransferOwnershipProps> = ({
	domainId,
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
	console.log(error);

	switch (step) {
		case Step.ADDRESS_INPUT:
			content = (
				<FormInputs
					action={'transfer'}
					label={'Ethereum Wallet'}
					error={Boolean(helperText)}
					helperText={helperText}
					placeholder={'Ethereum Wallet'}
					setHelperText={setHelperText}
					instructionText={'Enter recipient address:'}
					onSubmit={onConfirmAddressInput}
				/>
			);
			break;
		case Step.CONFIRM:
			content = <Confirm onConfirm={onConfirmTransfer} errorMessage={error} />;
			break;
		case Step.WAITING_FOR_WALLET:
			content = <WaitingForWallet />;
			break;
		case Step.PROCESSING:
			content = <Processing />;
			break;
		case Step.COMPLETE:
			content = <Complete />;
			break;
	}

	return (
		<form>
			<Wizard.Container header="Transfer Ownership">{content}</Wizard.Container>
		</form>
	);
};
