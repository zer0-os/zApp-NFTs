import { FC, useContext } from 'react';

import { DAOSummary, DetailsForm, GovernanceForm, TreasuryForm } from './steps';
import { CreateDAOFormContext } from './';

type CreateDAOBodyProps = {
	onClose: () => void;
};

export const CreateDAOBody: FC<CreateDAOBodyProps> = ({ onClose }) => {
	const { stepId } = useContext(CreateDAOFormContext);

	switch (stepId) {
		case 'details':
			return <DetailsForm onClose={onClose} />;
		case 'governance':
			return <GovernanceForm onClose={onClose} />;
		case 'treasury':
			return <TreasuryForm onClose={onClose} />;
		case 'launch':
			return <DAOSummary onClose={onClose} />;
	}
};
