import { FC } from 'react';

import { FormInputs, FormDetails } from '../../ui';

interface DetailsProps {
	domainName: string;
	domainTitle: string;
	domainCreator: string;
	error: string;
	onConfirm: (inputAdrressValue: string) => void;
}

export const Details: FC<DetailsProps> = ({
	domainName,
	domainTitle,
	domainCreator,
	error,
	onConfirm,
}) => {
	return (
		<>
			<FormDetails
				name={domainName}
				title={domainTitle}
				creator={domainCreator}
			/>
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
