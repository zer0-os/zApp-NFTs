//- React Imports
import React, { FC, useState } from 'react';

//- Style Imports
import styles from './CreateToken.module.scss';

//- Component Imports
import { Wizard } from '@zero-tech/zui/src/components/Wizard/Wizard';
import { CreateTokenBody } from './CreateTokenBody/CreateTokenBody';
import { CreateTokenHeader } from './CreateTokenHeader/CreateTokenHeader';

//- Type Imports
import { Step } from '@zero-tech/zui/src/components/StepBar/StepBar.types';
import { DetailsFormSubmit } from './CreateToken.types';

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

	const [details, setDetails] = useState<DetailsFormSubmit>({
		avatar: null,
		name: '',
		symbol: '',
	});

	const handleDetailsSubmit = (values: DetailsFormSubmit): void => {
		setTitle(`Create "${values.name}" Token`);
		setDetails(values);
		setStepId(steps[1].id);
	}

	return (
		<Wizard.Container className={styles.CreateToken}>
			<CreateTokenHeader
				title={title}
				subtitle={domainName}
				stepId={stepId}
				steps={steps}
				onClose={onClose}
				onChangeStep={(step: Step) => setStepId(step.id)}
			/>
			<CreateTokenBody stepId={stepId} detailsFormValues={details} onDetailsSubmit={handleDetailsSubmit} />
		</Wizard.Container>
	);
};
