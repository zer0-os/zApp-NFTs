import { FC } from 'react';

import { NFTDetails } from '../ui/NFTDetails';
import { FormInputs } from '../../../../ui';

export interface DetailsProps {
	zna: string;
	errorText: string;
	onConfirm: (walletAddress: string) => void;
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
