import { FC } from 'react';

import { ConfirmStepProps } from './FormSteps.types';

import { Wizard } from '@zero-tech/zui/components/Wizard';

import { FormStepsText } from '../TransferOwnership.constants';

import styles from '../TransferOwnership.module.scss';

export const Confirm: FC<ConfirmStepProps> = ({
	onConfirm,
	onClose,
	errorMessage,
}) => {
	const isError = errorMessage !== undefined;

	const transferText = (
		<>
			<p>{FormStepsText.TRANSACTION_ALERT}</p>
			{isError && <span className={styles.ErrorMessage}>{errorMessage}</span>}
		</>
	);

	return (
		<Wizard.Confirmation
			onClickPrimaryButton={onConfirm}
			onClickSecondaryButton={onClose}
			primaryButtonText={'Confirm'}
			secondaryButtonText={'Cancel'}
			isPrimaryButtonActive
			isSecondaryButtonActive
			message={transferText}
		/>
	);
};
