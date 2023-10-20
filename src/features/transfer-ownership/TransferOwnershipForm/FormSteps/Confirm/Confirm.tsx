import { FC } from 'react';

import { TextContent } from '../ui/TextContent';
import { Wizard } from '@zero-tech/zui/components';

export interface ConfirmProps {
	errorText?: string;
	onConfirm: () => void;
	onClose: () => void;
}

export const Confirm: FC<ConfirmProps> = ({
	errorText,
	onConfirm,
	onClose,
}) => {
	const primaryButtonText = errorText ? 'Retry' : 'Confirm';

	const transferText = (
		<TextContent
			textContent={
				'This transaction is about to be seared upon the blockchain. There’s no going back.'
			}
			errorText={errorText}
		/>
	);

	return (
		<Wizard.Confirmation
			onClickPrimaryButton={onConfirm}
			onClickSecondaryButton={onClose}
			primaryButtonText={primaryButtonText}
			secondaryButtonText={'Cancel'}
			isPrimaryButtonActive
			isSecondaryButtonActive
			message={transferText}
		/>
	);
};
