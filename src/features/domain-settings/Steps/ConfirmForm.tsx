import { FC } from 'react';

import { ConfirmActionType } from '../DomainSettings.types';
import { CONFIRM_STEP_TEXT_CONTENT } from '../DomainSettings.constants';

import { FormTextContent } from '../../ui';
import { Wizard } from '@zero-tech/zui';

import styles from './ConfirmForm.module.scss';

interface ConfirmFormProps {
	confirmActionType: ConfirmActionType;
	onRestart: () => void;
	onSubmitFormStep: () => void;
}

export const ConfirmForm: FC<ConfirmFormProps> = ({
	confirmActionType,
	onRestart,
	onSubmitFormStep,
}) => {
	const { primaryButtonText, message } =
		CONFIRM_STEP_TEXT_CONTENT[confirmActionType];

	const confirmationMessage = <FormTextContent textContent={message} />;

	return (
		<Wizard.Confirmation
			className={styles.Confirmation}
			message={confirmationMessage}
			isPrimaryButtonActive
			isSecondaryButtonActive
			onClickPrimaryButton={onSubmitFormStep}
			onClickSecondaryButton={onRestart}
			primaryButtonText={primaryButtonText}
			secondaryButtonText={'Return'}
		/>
	);
};
