import { FC } from 'react';

import { useDomainSettingsForm } from './hooks';
import { useFormSteps } from './FormSteps/hooks';
import { StepBar, Wizard } from '@zero-tech/zui/components';
import { IconXClose } from '@zero-tech/zui/components/Icons';

import styles from './DomainSettingsForm.module.scss';

interface DomainSettingsFormProps {
	zna: string;
	onClose: () => void;
}

export const DomainSettingsForm: FC<DomainSettingsFormProps> = ({
	zna,
	onClose,
}) => {
	const { step, error, statusText } = useDomainSettingsForm(zna);

	const { content } = useFormSteps({
		zna,
		step,
		error,
		statusText,
		onClose,
	});

	return (
		<Wizard.Container
			className={styles.Container}
			header="My Domain Settings"
			subHeader={zna}
			sectionDivider={false}
		>
			<div className={styles.Close} onClick={onClose}>
				<IconXClose size={24} />
			</div>
			{/* <StepBar currentStepId={''} steps={[]} onChangeStep={() => {}} /> */}
			<form className={styles.Form}>{content}</form>
		</Wizard.Container>
	);
};
