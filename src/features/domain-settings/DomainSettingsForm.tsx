import { FC } from 'react';

import { DomainSettingsHeader } from '.';
import { useDomainSettingsForm } from './hooks';

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
		formHeader,
		formContent,
		isTransactionLoading,
		onStepBarUpdate,
	} = useDomainSettingsForm(zna, onClose);

	return (
		<Wizard.Container>
			<DomainSettingsHeader
				zna={zna}
				stepId={stepId}
				headerText={formHeader}
				isTransactionLoading={isTransactionLoading}
				onStepBarUpdate={onStepBarUpdate}
				onClose={onClose}
			/>
			<form>{formContent}</form>
		</Wizard.Container>
	);
};
