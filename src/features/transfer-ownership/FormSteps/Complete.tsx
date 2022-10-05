import { FC } from 'react';

import { StepProps } from './FormSteps.types';

import { Wizard } from '@zero-tech/zui/components/Wizard';

export const Complete: FC<StepProps> = ({ onClose }) => (
	<Wizard.Confirmation
		onClickPrimaryButton={onClose}
		primaryButtonText={'Finish'}
		isPrimaryButtonActive
		message={'Transfer Successful'}
	/>
);
