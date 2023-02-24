import { FC } from 'react';

import { steps, ConfirmActionType } from '../DomainSettings.types';

import { FormTextContent } from '../../ui';
import { Step, Wizard } from '@zero-tech/zui/components';

import styles from './ConfirmStep.module.scss';

interface ConfirmStepProps {
	confirmActionType: ConfirmActionType;
	onStepUpdate: (step: Step) => void;
	onSubmit: () => void;
}

export const ConfirmStep: FC<ConfirmStepProps> = ({
	confirmActionType,
	onStepUpdate,
	onSubmit,
}) => {
	const { primaryButtonText, message } = STEP_TEXT[confirmActionType];

	const confirmationMessage = <FormTextContent textContent={message} />;

	const onBack = () => {
		onStepUpdate(steps[0]);
	};

	return (
		<Wizard.Confirmation
			className={styles.Confirmation}
			message={confirmationMessage}
			isPrimaryButtonActive
			isSecondaryButtonActive
			onClickPrimaryButton={onSubmit}
			onClickSecondaryButton={onBack}
			primaryButtonText={primaryButtonText}
			secondaryButtonText={'Return'}
		/>
	);
};

/*************
 * STEP_TEXT
 *************/

const STEP_TEXT = {
	[ConfirmActionType.UNLOCK]: {
		primaryButtonText: 'Unlock Metadata',
		message:
			'Unlocking metadata is a blockchain transaction that will cost gas. \nAdditional, optional, transactions are required to save changes and lock the metadata again.',
	},
	[ConfirmActionType.SAVE_AND_LOCK]: {
		primaryButtonText: 'Save & Lock',
		message:
			'Your changes will be saved and the metadata will be locked. \nYou will be the only one who can unlock it in the future.',
	},
	[ConfirmActionType.SAVE_WITHOUT_LOCKING]: {
		primaryButtonText: 'Save Without Locking',
		message:
			'If you transfer ownership of the domain while metadata is unlocked, the new owner can edit the metadata and lock it. You may lose access forever.',
	},
};
