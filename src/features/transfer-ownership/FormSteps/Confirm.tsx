import { FC } from 'react';

import { StepProps } from './FormSteps.types';

import { Wizard } from '@zero-tech/zui/components/Wizard';

import { StepText } from './FormSteps.constants';

import styles from './FormSteps.module.scss';

export const Confirm: FC<StepProps> = ({
	onConfirm,
	onClose,
	errorMessage,
}) => {
	const transferText = (
		<>
			<p>{StepText.TRANSACTION_ALERT}</p>
			{errorMessage !== undefined && (
				<span className={styles.ErrorMessage}>{errorMessage}</span>
			)}
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
