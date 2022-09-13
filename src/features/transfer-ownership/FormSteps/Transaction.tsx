import { FC } from 'react';

import { Wizard } from '@zero-tech/zui/components/Wizard';

import { ConfirmStepProps } from './FormSteps.types';

import { FormStepsText } from '../TransferOwnership.constants';

export const Transaction: FC<ConfirmStepProps> = ({ isTransferring }) => {
	const transactionMessage = isTransferring
		? 'Your transaction is being processed...'
		: 'Please accept wallet transaction..';

	return (
		<>
			<Wizard.Loading
				message={
					<div>
						<p>{FormStepsText.TRANSACTION_ALERT}</p>
						<p>{transactionMessage}</p>
					</div>
				}
			/>
		</>
	);
};
