//- React Imports
import React, { FC } from 'react';
import { DetailsFormSubmit } from '../CreateToken.types';

//- Component Imports
import { DetailsForm } from './DetailsForm/DetailsForm';
import { TokenomicsForm } from './TokenomicsForm/TokenomicsForm';
import { TokenSummary } from './TokenSummary/TokenSummary';

type CreateTokenBodyProps = {
	stepId: string;
	detailsFormValues: DetailsFormSubmit;
	onDetailsSubmit: (values) => void;
};

export const CreateTokenBody: FC<CreateTokenBodyProps> = ({ stepId, detailsFormValues, onDetailsSubmit }) => {
	switch (stepId) {
		case 'details':
			return <DetailsForm values={detailsFormValues} onSubmit={onDetailsSubmit} />;
		case 'tokenomics':
			return <TokenomicsForm />;
		case 'launch':
			return <TokenSummary />;
	}
};
