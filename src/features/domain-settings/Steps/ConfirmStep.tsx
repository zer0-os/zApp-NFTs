import { FC } from 'react';

import { steps, ConfirmActionType } from '../DomainSettings.types';

import { FormTextContent } from '../../ui';
import { Step, Wizard } from '@zero-tech/zui/components';

import styles from './ConfirmStep.module.scss';

interface ConfirmFormProps {
	confirmActionType: ConfirmActionType;
	onStepUpdate: (step: Step) => void;
	onLockMetadataStatus: () => void;
	onSetAndLockMetadata: () => void;
	onSetMetadata: () => void;
}

export const ConfirmForm: FC<ConfirmFormProps> = ({
	confirmActionType,
	onStepUpdate,
	onLockMetadataStatus,
	onSetAndLockMetadata,
	onSetMetadata,
}) => {
	const confirmationStepContent = getStepTextContent(confirmActionType);

	const confirmationMessage = (
		<FormTextContent textContent={confirmationStepContent.message} />
	);

	const onBack = () => {
		onStepUpdate(steps[0]);
	};

	const onSubmit = async (): Promise<void> => {
		if (confirmActionType === 'unlock') {
			onLockMetadataStatus();
		} else if (confirmActionType === 'save-and-lock') {
			onSetAndLockMetadata();
		} else {
			onSetMetadata();
		}
	};

	return (
		<Wizard.Confirmation
			className={styles.Confirmation}
			message={confirmationMessage}
			isPrimaryButtonActive
			isSecondaryButtonActive
			onClickPrimaryButton={onSubmit}
			onClickSecondaryButton={onBack}
			primaryButtonText={confirmationStepContent.primaryButtonText}
			secondaryButtonText={'Return'}
		/>
	);
};

/************************
 * getStepTextContent
 ************************/

type StepData = {
	primaryButtonText: string;
	message: string;
};

const getStepTextContent = (confirmActionType: string) => {
	let stepData: StepData;

	if (confirmActionType === 'unlock') {
		stepData = {
			primaryButtonText: 'Unlock Metadata',
			message:
				'Unlocking metadata is a blockchain transaction that will cost gas. \nAdditional, optional, transactions are required to save changes and lock the metadata again.',
		};
	} else if (confirmActionType === 'save-and-lock') {
		stepData = {
			primaryButtonText: 'Save & Lock',
			message:
				'Your changes will be saved and the metadata will be locked. \nYou will be the only one who can unlock it in the future.',
		};
	} else {
		stepData = {
			primaryButtonText: 'Save Without Locking',
			message:
				'If you transfer ownership of the domain while metadata is unlocked, the new owner can edit the metadata and lock it. You may lose access forever.',
		};
	}

	return stepData;
};
