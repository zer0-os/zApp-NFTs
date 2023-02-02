import { FC } from 'react';

import { DomainSettingsHeader } from '.';
import { useDomainSettingsForm, useFormSteps } from './hooks';
import { Wizard } from '@zero-tech/zui/components';

export type DomainSettingsFormProps = {
	zna: string;
	onClose: () => void;
};

export const DomainSettingsForm: FC<DomainSettingsFormProps> = ({
	zna,
	onClose,
}) => {
	// Form data and handlers
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

	// Sets step content and calls actions
	const { content } = useFormSteps({
		zna,
		stepId,
		errorText,
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
		onClose,
	});

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
