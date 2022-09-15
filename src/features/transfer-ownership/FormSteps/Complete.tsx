import { FC } from 'react';

import { StepProps } from './types';

import { Wizard } from '@zero-tech/zui/components/Wizard';

export const Complete: FC<StepProps> = ({ onClose }) => (
	<Wizard.Confirmation
		onClickPrimaryButton={onClose}
		primaryButtonText={'Finish'}
		isPrimaryButtonActive
		message={'Transfer Successful'}
	/>
);
