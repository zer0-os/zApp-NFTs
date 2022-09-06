//- React Imports
import React, { FC } from 'react';

//- Component Imports
import { DetailsForm } from './DetailsForm/DetailsForm';
import { TokenomicsForm } from './TokenomicsForm/TokenomicsForm';
import { TokenSummary } from './TokenSummary/TokenSummary';

type CreateTokenBodyProps = {
	stepId: string;
	onDetailsSubmit: (values) => void;
};

export const CreateTokenBody: FC<CreateTokenBodyProps> = ({ stepId, onDetailsSubmit }) => {
	switch (stepId) {
		case 'details':
			return <DetailsForm onSubmit={onDetailsSubmit} />;
		case 'tokenomics':
			return <TokenomicsForm />;
		case 'launch':
			return <TokenSummary />;
	}
};
