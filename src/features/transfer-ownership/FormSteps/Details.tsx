import { FC } from 'react';

import { FormInputs, FormDetails } from '../../ui';

interface DetailsProps {
	zna: string;
	error: string;
	onConfirm: (inputAdrressValue: string) => void;
}

export const Details: FC<DetailsProps> = ({ zna, error, onConfirm }) => {
	return (
		<>
			<FormDetails zna={zna} />
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
