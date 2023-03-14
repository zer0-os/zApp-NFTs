import { FC } from 'react';

import { FormInput, NFTDetails } from '../ui';
export interface DetailsProps {
	zna: string;
	errorText: string;
	onSubmit: (bid: string) => void;
	onClose: () => void;
}

export const Details: FC<DetailsProps> = ({
	zna,
	errorText,
	onSubmit,
	onClose,
}) => {
	return (
		<>
			<NFTDetails zna={zna} />

			<FormInput
				zna={zna}
				errorText={errorText}
				onSubmit={onSubmit}
				onClose={onClose}
			/>
		</>
	);
};
