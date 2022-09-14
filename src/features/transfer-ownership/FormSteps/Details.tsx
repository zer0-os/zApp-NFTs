import { FC } from 'react';

import { TransferError } from '../TransferOwnership.types';
import { ErrorType } from '../TransferOwnership.constants';

import { FormInputs, FormDetails } from '../../ui';

interface TransferOwnershipProps {
	domainName: string;
	domainTitle: string;
	domainCreator: string;
	error: TransferError;
	onConfirm: (inputAdrressValue: string) => void;
}

export const Details: FC<TransferOwnershipProps> = ({
	domainName,
	domainTitle,
	domainCreator,
	error,
	onConfirm,
}) => {
	const isError = error && error.type === ErrorType.INPUT;
	const errorMessage = isError ? error.message : undefined;

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
