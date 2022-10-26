import { FC } from 'react';

import { FormInputs, FormDetails } from '../../ui';

interface DetailsProps {
	error: string;
	domainId: string;
	onConfirm: (inputAdrressValue: string) => void;
}

export const Details: FC<DetailsProps> = ({ error, domainId, onConfirm }) => {
	return (
		<>
			<FormDetails domainId={domainId} />
			<FormInputs
				action={'transfer'}
				label={'Enter recipient address:'}
				errorMessage={error}
				placeholder={'Ethereum Wallet'}
				onSubmit={onConfirm}
			/>
		</>
	);
};
