import { FC } from 'react';

import { Wizard } from '@zero-tech/zui/components/Wizard';

import { StepProps } from './FormSteps.types';
import { StepText } from './FormSteps.constants';

export const Transaction: FC<StepProps> = ({ isTransferring }) => {
	const transactionMessage = isTransferring
		? 'Your transaction is being processed...'
		: 'Please accept wallet transaction..';

	return (
		<Wizard.Loading
			message={
				<div>
					<p>{StepText.TRANSACTION_ALERT}</p>
					<p>{transactionMessage}</p>
				</div>
			}
		/>
	);
};
