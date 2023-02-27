import { FC } from 'react';

import { ConfirmActionType } from '../DomainSettings.types';
import { CONFIRM_STEP_TEXT_CONTENT } from '../DomainSettings.constants';

import { FormTextContent } from '../../ui';
import { Wizard } from '@zero-tech/zui/components';

import styles from './ConfirmStep.module.scss';

interface ConfirmStepProps {
	confirmActionType: ConfirmActionType;
	onRestart: () => void;
	onSubmit: () => void;
}

export const ConfirmStep: FC<ConfirmStepProps> = ({
	confirmActionType,
	onRestart,
	onSubmit,
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
			onClickPrimaryButton={onSubmit}
			onClickSecondaryButton={onRestart}
			primaryButtonText={primaryButtonText}
			secondaryButtonText={'Return'}
		/>
	);
};
