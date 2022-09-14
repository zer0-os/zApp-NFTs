import { FC } from 'react';

import { StepProps } from './types';

import { Wizard } from '@zero-tech/zui/components/Wizard';

import { StepText } from '../TransferOwnership.constants';

import styles from '../TransferOwnership.module.scss';

export const Confirm: FC<StepProps> = ({
	onConfirm,
	onClose,
	errorMessage,
}) => {
	const isError = errorMessage !== undefined;

	const transferText = (
		<>
			<p>{StepText.TRANSACTION_ALERT}</p>
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
