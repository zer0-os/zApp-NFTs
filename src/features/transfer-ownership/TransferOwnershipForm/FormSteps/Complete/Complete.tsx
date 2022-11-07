import { FC } from 'react';

import { TextContent } from '../ui/TextContent';
import { Wizard, ConfirmationProps } from '@zero-tech/zui/components/Wizard';

export interface CompleteProps {
	onClose: ConfirmationProps['onClickPrimaryButton'];
}

export const Complete: FC<CompleteProps> = ({ onClose }) => {
	const successText = (
		<TextContent textContent={'Transfer Successful'} variant={'success'} />
	);

	return (
		<Wizard.Confirmation
			onClickPrimaryButton={onClose}
			primaryButtonText={'Finish'}
			isPrimaryButtonActive
			message={successText}
		/>
	);
};
