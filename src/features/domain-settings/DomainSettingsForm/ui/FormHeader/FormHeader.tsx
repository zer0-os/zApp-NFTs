import { FC } from 'react';

import { steps } from '../../DomainSettingsForm.types';

import { Wizard, Step, StepBar } from '@zero-tech/zui/components';
import { IconXClose } from '@zero-tech/zui/components/Icons';

import styles from './FormHeader.module.scss';

interface FormHeaderProps {
	zna: string;
	stepId: string;
	onChangeStep: (step: Step) => void;
	onClose: () => void;
}

export const FormHeader: FC<FormHeaderProps> = ({
	zna,
	stepId,
	onChangeStep,
	onClose,
}) => {
	return (
		<Wizard.Header
			header={'My Domain Settings'}
			subHeader={zna}
			sectionDivider={false}
		>
			<div className={styles.Close} onClick={onClose}>
				<IconXClose size={24} />
			</div>
			<StepBar
				currentStepId={stepId}
				steps={steps}
				onChangeStep={onChangeStep}
			/>
		</Wizard.Header>
	);
};
