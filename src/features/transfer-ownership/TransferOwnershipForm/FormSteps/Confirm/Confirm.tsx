import { FC } from 'react';

import { TextContent } from '../ui/TextContent';
import { Wizard, ConfirmationProps } from '@zero-tech/zui/components/Wizard';

export interface ConfirmProps {
	errorText?: string;
	onConfirm: ConfirmationProps['onClickPrimaryButton'];
	onClose: ConfirmationProps['onClickSecondaryButton'];
}

export const Confirm: FC<ConfirmProps> = ({
	errorText,
	onConfirm,
	onClose,
}) => {
	const primaryButtonText: ConfirmationProps['primaryButtonText'] = errorText
		? 'Retry'
		: 'Confirm';

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
