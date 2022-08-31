//- React Imports
import React, { FC, useState } from 'react';

//- Style Imports
import './CreateToken.scss';

//- Component Imports
import { Wizard } from '@zero-tech/zui/src/components/Wizard/Wizard';
import { CreateTokenBody } from './CreateTokenBody/CreateTokenBody';
import { CreateTokenHeader } from './CreateTokenHeader/CreateTokenHeader';

//- Type Imports
import { Step } from '@zero-tech/zui/src/components/StepBar/StepBar.types';

const steps: Step[] = [
	{
		id: 'details',
		title: 'Details',
	},
	{
		id: 'tokenomics',
		title: 'Tokenomics',
	},
	{
		id: 'launch',
		title: 'Launch',
	},
];

export type CreateTokenProps = {
	domainName: string;
	onClose: () => void;
};

export const CreateToken: FC<CreateTokenProps> = ({ domainName, onClose }) => {
	const [stepId, setStepId] = useState(steps[0].id);
	const [title, setTitle] = useState('Create Token');
	const [subtitle, setSubtitle] = useState(domainName);
	const [primaryButtonText, setPrimaryButtonText] = useState('Next');

	const handleChangeStep = (step: Step): void => {
		setStepId(step.id);
		if (step.id === 'launch') {
			setPrimaryButtonText('Confirm');
		} else {
			setPrimaryButtonText('Next');
		}
	};

	const handleClickPrimaryButton = () => {
		if (stepId === 'details') {
			handleChangeStep(steps[1]);
		} else if (stepId === 'tokenomics') {
			handleChangeStep(steps[2]);
		} else {
			// TODO: wire up create token submit once action added to SDK by protocol team.
		}
	};

	return (
		<Wizard.Container className="create-token">
			<CreateTokenHeader
				title={title}
				subtitle={subtitle}
				stepId={stepId}
				steps={steps}
				onClose={onClose}
				onChangeStep={handleChangeStep}
			/>
			<CreateTokenBody stepId={stepId} />
			<Wizard.Confirmation
				message=""
				isPrimaryButtonActive
				primaryButtonText={primaryButtonText}
				isSecondaryButtonActive
				onClickPrimaryButton={handleClickPrimaryButton}
				onClickSecondaryButton={onClose}
			/>
		</Wizard.Container>
	);
};
