import React, { createContext, useState, FC } from 'react';

import * as ztoken from '@zero-tech/ztoken-sdk';
import { TokenMintOptions } from '@zero-tech/ztoken-sdk/src/types';

import { useWeb3 } from '../../lib/hooks/useWeb3';

import { Step } from '@zero-tech/zui';
import { DetailsFormSubmit, TokenomicsFormSubmit, steps } from './';

export const CreateTokenFormContext = createContext({
	stepId: 'details',
	title: 'Create Token',
	details: {
		mediaType: undefined,
		previewUrl: '',
		name: '',
		symbol: '',
	},
	tokenomics: {
		tokenCount: '',
		initialTokenSupplyWalletAddress: '',
		adminWalletAddress: '',
	},
	onStepUpdate: (step: Step) => {},
	onTitleUpdate: (title: string) => {},
	onDetailsChange: (values: DetailsFormSubmit) => {},
	onDetailsSubmit: (values: DetailsFormSubmit) => {},
	onTokenomicsSubmit: (values: TokenomicsFormSubmit) => {},
	onLaunchSubmit: async () => {},
});

interface Props {
	children: React.ReactNode;
}

export const CreateTokenFormContextProvider: FC<Props> = ({ children }) => {
	const [stepId, setStepId] = useState(steps[0].id);
	const [title, setTitle] = useState('Create Token');

	const { provider } = useWeb3();

	const [details, setDetails] = useState<DetailsFormSubmit>({
		mediaType: undefined,
		previewUrl: '',
		avatar: null,
		name: '',
		symbol: '',
	});

	const [tokenomics, setTokenomics] = useState<TokenomicsFormSubmit>({
		tokenCount: '',
		initialTokenSupplyWalletAddress: '',
		adminWalletAddress: '',
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
		setTitle(`Create "${values.name}" Token`);
		setDetails(values);
		setStepId(steps[1].id);
	};

	const onTokenomicsSubmit = (values: TokenomicsFormSubmit): void => {
		setTokenomics(values);
		setStepId(steps[2].id);
	};

	const onLaunchSubmit = async (): Promise<void> => {
		const options: TokenMintOptions = {
			target: tokenomics.adminWalletAddress,
			amount: tokenomics.tokenCount,
		};

		const signer = provider.getSigner();
		await ztoken.createZToken(signer, details.name, details.symbol, options);
	};

	return (
		<CreateTokenFormContext.Provider
			value={{
				stepId,
				title,
				details,
				tokenomics,
				onStepUpdate,
				onTitleUpdate,
				onDetailsChange,
				onDetailsSubmit,
				onTokenomicsSubmit,
				onLaunchSubmit,
			}}
		>
			{children}
		</CreateTokenFormContext.Provider>
	);
};
