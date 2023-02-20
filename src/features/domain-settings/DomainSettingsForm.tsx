import { FC, ReactNode } from 'react';

import { DomainSettingsHeader, FormStep } from '.';
import { useDomainSettingsForm } from './hooks';

import { DetailsForm, ConfirmForm } from './Steps';
import { Wizard } from '@zero-tech/zui/components';

export type DomainSettingsFormProps = {
	zna: string;
	onClose: () => void;
};

export const DomainSettingsForm: FC<DomainSettingsFormProps> = ({
	zna,
	onClose,
}) => {
	const {
		stepId,
		errorText,
		formHeader,
		confirmActionType,
		loadingStatusText,
		isTransactionLoading,
		onStepUpdate,
		onTitleUpdate,
		onFormDetailsSubmit,
		onLockMetadataStatus,
		onSetAndLockMetadata,
		onSetMetadata,
		onConfirmActionUpdate,
	} = useDomainSettingsForm(zna);

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

	return (
		<Wizard.Container>
			<DomainSettingsHeader
				zna={zna}
				stepId={stepId}
				headerText={formHeader}
				isTransactionLoading={isTransactionLoading}
				onStepUpdate={onStepUpdate}
				onClose={onClose}
			/>
			<form>{content}</form>
		</Wizard.Container>
	);
};
