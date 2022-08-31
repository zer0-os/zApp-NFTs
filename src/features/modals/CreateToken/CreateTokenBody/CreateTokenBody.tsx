//- React Imports
import React, { FC } from 'react';

//- Component Imports
import { DetailsForm } from './DetailsForm';
import { TokenomicsForm } from './TokenomicsForm';
import { TokenSummary } from './TokenSummary';

type CreateTokenBodyProps = {
	stepId: string;
};

export const CreateTokenBody: FC<CreateTokenBodyProps> = ({ stepId }) => {
	switch (stepId) {
		case 'details':
			return <DetailsForm />;
		case 'tokenomics':
			return <TokenomicsForm />;
		case 'launch':
			return <TokenSummary />;
	}
};
