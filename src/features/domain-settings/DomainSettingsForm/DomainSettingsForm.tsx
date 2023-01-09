import { FC } from 'react';

import { useDomainSettingsForm } from './hooks';
import { useFormSteps } from './FormSteps/hooks';

import { FormHeader } from './ui/FormHeader';
import { Wizard } from '@zero-tech/zui/components';

import styles from './DomainSettingsForm.module.scss';

interface DomainSettingsFormProps {
	zna: string;
	onClose: () => void;
}

export const DomainSettingsForm: FC<DomainSettingsFormProps> = ({
	zna,
	onClose,
}) => {
	const { step, stepId, error, statusText, onChangeStep } =
		useDomainSettingsForm(zna);

	const { content } = useFormSteps({
		zna,
		step,
		error,
		statusText,
		onClose,
	});

	return (
		<div className={styles.Container}>
			<FormHeader
				zna={zna}
				stepId={stepId}
				onChangeStep={onChangeStep}
				onClose={onClose}
			/>

			<Wizard.Container className={styles.WizardContainer}>
				<form className={styles.Form}>{content}</form>
			</Wizard.Container>
		</div>
	);
};
