import { FC } from 'react';

import { TextContent } from '../ui/TextContent';
import { Wizard } from '@zero-tech/zui/components/Wizard';

export interface CompleteProps {
	onClose: () => void;
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
