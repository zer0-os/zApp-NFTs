//- React Imports
import React, { FC } from 'react';

//- Style Imports
import './CreateTokenHeader.scss';

//- Component Imports
import { IconCross } from '@zero-tech/zui/src/components/Icons';
import { StepBar } from '@zero-tech/zui/src/components/StepBar/StepBar';
import { Step } from '@zero-tech/zui/src/components/StepBar/StepBar.types';
import { Wizard } from '@zero-tech/zui/src/components/Wizard/Wizard';

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
	<div className="create-token-header">
		<Wizard.Header
			header={title}
			headerInfo="Create a token currency for a domain or DAO. The standard is the ERC-20 token standard."
			subHeader={subtitle}
			sectionDivider={false}
		>
			<div className="create-token-header-close" onClick={onClose}>
				<IconCross size={24} />
			</div>
			<StepBar
				currentStepId={stepId}
				steps={steps}
				onChangeStep={onChangeStep}
			/>
		</Wizard.Header>
	</div>
);
