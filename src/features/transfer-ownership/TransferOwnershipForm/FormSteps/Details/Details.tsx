import { FC } from 'react';

import { NFTDetails } from '../ui/NFTDetails';
import { FormInputs, FormInputsProps } from '../../../../ui';

export interface DetailsProps {
	zna: string;
	errorText: FormInputsProps['errorMessage'];
	onConfirm: FormInputsProps['onSubmit'];
}

export const Details: FC<DetailsProps> = ({ zna, errorText, onConfirm }) => {
	return (
		<>
			<NFTDetails zna={zna} />

			<FormInputs
				action={'transfer'}
				label={'Enter recipient address:'}
				errorMessage={errorText}
				placeholder={'Ethereum Wallet'}
				onSubmit={onConfirm}
			/>
		</>
	);
};
