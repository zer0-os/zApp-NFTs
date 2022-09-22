import { FC, useContext } from 'react';
import { CreateTokenFormContext } from './CreateTokenFormContext';

import { DetailsForm, TokenomicsForm, TokenSummary } from './steps';

type CreateTokenBodyProps = {
	onClose: () => void;
};

export const CreateTokenBody: FC<CreateTokenBodyProps> = ({ onClose }) => {
	const { stepId } = useContext(CreateTokenFormContext);

	switch (stepId) {
		case 'details':
			return <DetailsForm onClose={onClose} />;
		case 'tokenomics':
			return <TokenomicsForm onClose={onClose} />;
		case 'launch':
			return <TokenSummary onClose={onClose} />;
	}
};
