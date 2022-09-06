//- React Imports
import React, { FC } from 'react';
import { DetailsFormSubmit, TokenomicsFormSubmit } from '../CreateToken.types';

//- Component Imports
import { DetailsForm } from './DetailsForm/DetailsForm';
import { TokenomicsForm } from './TokenomicsForm/TokenomicsForm';
import { TokenSummary } from './TokenSummary/TokenSummary';

type CreateTokenBodyProps = {
	stepId: string;
	detailsFormValues: DetailsFormSubmit;
	onDetailsSubmit: (values: DetailsFormSubmit) => void;
	tokenomicsFormValues: TokenomicsFormSubmit;
	onTokenomicsSubmit: (values: TokenomicsFormSubmit) => void;
	onLaunchSubmit: () => void;
	onClose: () => void;
};

export const CreateTokenBody: FC<CreateTokenBodyProps> = ({
	stepId,
	detailsFormValues,
	onDetailsSubmit,
	tokenomicsFormValues,
	onTokenomicsSubmit,
	onLaunchSubmit,
	onClose,
}) => {
	switch (stepId) {
		case 'details':
			return (
				<DetailsForm
					values={detailsFormValues}
					onSubmit={onDetailsSubmit}
					onClose={onClose}
				/>
			);
		case 'tokenomics':
			return (
				<TokenomicsForm
					values={tokenomicsFormValues}
					onSubmit={onTokenomicsSubmit}
					onClose={onClose}
				/>
			);
		case 'launch':
			return <TokenSummary onSubmit={onLaunchSubmit} onClose={onClose} />;
	}
};
