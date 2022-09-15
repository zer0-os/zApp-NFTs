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
	const isError = Boolean(error);
	const errorMessage = isError ? error : undefined;

	return (
		<>
			<FormDetails
				name={domainName}
				title={domainTitle}
				creator={domainCreator}
			/>
			<FormInputs
				action={'transfer'}
				label={'Ethereum Wallet'}
				isError={isError}
				errorMessage={errorMessage}
				placeholder={'Ethereum Wallet'}
				instructionText={'Enter recipient address:'}
				onSubmit={onConfirm}
			/>
		</>
	);
};
