import React, { createContext, useState, FC } from 'react';

import { Step } from '@zero-tech/zui/components';
import {
	DetailsFormSubmit,
	GovernanceFormSubmit,
	steps,
	TreasuryFormSubmit,
} from './';

export const CreateDAOFormContext = createContext({
	stepId: 'details',
	title: 'Create DAO',
	details: {
		mediaType: undefined,
		previewUrl: '',
		name: '',
		znaAddress: '',
		description: '',
	},
	governance: {
		votingProcess: 'absolute',
		votingPeriod: '',
		votingSystem: '',
		daoTokenAddress: '',
		votingThreshold: '',
	},
	treasury: {
		gnosisSafe: '',
	},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onStepUpdate: (step: Step) => {},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onTitleUpdate: (title: string) => {},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onDetailsChange: (values: DetailsFormSubmit) => {},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onDetailsSubmit: (values: DetailsFormSubmit) => {},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onGovernanceSubmit: (values: GovernanceFormSubmit) => {},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onTreasurySubmit: (values: TreasuryFormSubmit) => {},
	onLaunchSubmit: () => {},
});

interface Props {
	children: React.ReactNode;
}

export const CreateDAOFormContextProvider: FC<Props> = ({ children }) => {
	const [stepId, setStepId] = useState(steps[0].id);
	const [title, setTitle] = useState('Create DAO');

	const [details, setDetails] = useState<DetailsFormSubmit>({
		mediaType: undefined,
		previewUrl: '',
		avatar: null,
		name: '',
		znaAddress: '',
		description: '',
	});

	const [governance, setGovernance] = useState<GovernanceFormSubmit>({
		votingProcess: 'absolute',
		votingPeriod: '',
		votingSystem: '',
		daoTokenAddress: '',
		votingThreshold: '',
	});

	const [treasury, setTreasury] = useState<TreasuryFormSubmit>({
		gnosisSafe: '',
	});

	const onStepUpdate = (step: Step): void => {
		setStepId(step.id);
	};

	const onTitleUpdate = (title: string): void => {
		setTitle(title);
	};

	const onDetailsChange = (values: DetailsFormSubmit): void => {
		setDetails(values);
	};

	const onDetailsSubmit = (values: DetailsFormSubmit): void => {
		setTitle(`Create "${values.name}" DAO`);
		setDetails(values);
		setStepId(steps[1].id);
	};

	const onGovernanceSubmit = (values: GovernanceFormSubmit): void => {
		setGovernance(values);
		setStepId(steps[2].id);
	};

	const onTreasurySubmit = (values: TreasuryFormSubmit): void => {
		setTreasury(values);
		setStepId(steps[3].id);
	};

	const onLaunchSubmit = () => {
		// TODO - wire up launch action once sdk integrated.
	};

	return (
		<CreateDAOFormContext.Provider
			value={{
				stepId,
				title,
				details,
				governance,
				treasury,
				onStepUpdate,
				onTitleUpdate,
				onDetailsChange,
				onDetailsSubmit,
				onGovernanceSubmit,
				onTreasurySubmit,
				onLaunchSubmit,
			}}
		>
			{children}
		</CreateDAOFormContext.Provider>
	);
};
