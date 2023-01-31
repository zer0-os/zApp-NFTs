import { FC, useContext } from 'react';

import { DomainSettingsFormContext } from './DomainSettingsFormContext';

import { DetailsForm, CompleteForm, ConfirmForm } from './Steps';
import { Wizard } from '@zero-tech/zui/components';

type DomainSettingsBodyProps = {
	zna: string;
	onClose: () => void;
};

export const DomainSettingsBody: FC<DomainSettingsBodyProps> = ({
	zna,
	onClose,
}) => {
	const { stepId, isLoading, loadingStatusText } = useContext(
		DomainSettingsFormContext,
	);

	switch (stepId) {
		case 'details':
			return <DetailsForm zna={zna} />;

		case 'confirm':
			return !isLoading ? (
				<ConfirmForm />
			) : (
				<Wizard.Loading message={loadingStatusText} />
			);

		case 'complete':
			return <CompleteForm zna={zna} onClose={onClose} />;
	}
};
