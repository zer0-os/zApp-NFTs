import { FC } from 'react';

import { ConfirmStepProps } from './FormSteps.types';

import { Wizard } from '@zero-tech/zui/components/Wizard';

export const Complete: FC<ConfirmStepProps> = ({ onClose }) => (
	<>
		<Wizard.Confirmation
			onClickPrimaryButton={onClose}
			primaryButtonText={'Finish'}
			isPrimaryButtonActive
			message={'Transfer Successful'}
		/>
	</>
);
