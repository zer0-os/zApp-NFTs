import React, { FC } from 'react';

import { IconXClose } from '@zero-tech/zui/components/Icons';
import { StepBar } from '@zero-tech/zui/components/StepBar/StepBar';
import { Step } from '@zero-tech/zui/components/StepBar/StepBar.types';
import { Wizard } from '@zero-tech/zui/components/Wizard/Wizard';

import styles from './CreateTokenHeader.module.scss';

interface CreateTokenHeaderProps {
	title: string;
	subtitle: string;
	stepId: string;
	steps: Step[];
	onClose: () => void;
	onChangeStep: (step: Step) => void;
}

export const CreateTokenHeader: FC<CreateTokenHeaderProps> = ({
	title,
	subtitle,
	stepId,
	steps,
	onClose,
	onChangeStep,
}) => (
	<div className={styles.Container}>
		<Wizard.Header
			header={title}
			headerInfo="Create a token currency for a domain or DAO. The standard is the ERC-20 token standard."
			subHeader={subtitle}
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
	</div>
);
