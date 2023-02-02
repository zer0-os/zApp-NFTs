import { ReactNode } from 'react';

import {
	ConfirmActionType,
	FieldValues,
	FormStep,
} from '../DomainSettings.types';

import { DetailsForm, ConfirmForm } from '../Steps';
import { Step, Wizard } from '@zero-tech/zui/components';

interface UseFormStepsReturn {
	content: ReactNode;
}

interface useFormStepsProps {
	zna: string;
	stepId: string;
	errorText: string;
	confirmActionType: ConfirmActionType;
	loadingStatusText: string;
	isTransactionLoading: boolean;
	onClose: () => void;
	onStepUpdate: (step: Step) => void;
	onTitleUpdate: (title: string) => void;
	onFormDetailsSubmit: (values: FieldValues) => void;
	onLockMetadataStatus: () => void;
	onSetAndLockMetadata: () => void;
	onSetMetadata: () => void;
	onConfirmActionUpdate: (action: ConfirmActionType) => void;
}

export const useFormSteps = ({
	zna,
	stepId,
	errorText,
	confirmActionType,
	loadingStatusText,
	isTransactionLoading,
	onClose,
	onStepUpdate,
	onTitleUpdate,
	onFormDetailsSubmit,
	onLockMetadataStatus,
	onSetAndLockMetadata,
	onSetMetadata,
	onConfirmActionUpdate,
}: useFormStepsProps): UseFormStepsReturn => {
	let content: ReactNode;

	switch (stepId) {
		case FormStep.DETAILS:
			content = (
				<DetailsForm
					zna={zna}
					stepId={stepId}
					errorText={errorText}
					onStepUpdate={onStepUpdate}
					onTitleUpdate={onTitleUpdate}
					onFormDetailsSubmit={onFormDetailsSubmit}
					onConfirmActionUpdate={onConfirmActionUpdate}
				/>
			);
			break;

		case FormStep.CONFIRM:
			content = !isTransactionLoading ? (
				<ConfirmForm
					confirmActionType={confirmActionType}
					onStepUpdate={onStepUpdate}
					onLockMetadataStatus={onLockMetadataStatus}
					onSetAndLockMetadata={onSetAndLockMetadata}
					onSetMetadata={onSetMetadata}
				/>
			) : (
				<Wizard.Loading message={loadingStatusText} />
			);
			break;

		case FormStep.COMPLETE:
			content = !isTransactionLoading ? (
				<DetailsForm
					zna={zna}
					stepId={stepId}
					errorText={errorText}
					confirmActionType={confirmActionType}
					onLockMetadataStatus={onLockMetadataStatus}
					onStepUpdate={onStepUpdate}
					onConfirmActionUpdate={onConfirmActionUpdate}
					onClose={onClose}
				/>
			) : (
				<Wizard.Loading message={loadingStatusText} />
			);
			break;
	}

	return { content };
};
