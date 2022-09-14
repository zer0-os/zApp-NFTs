import { FC } from 'react';

import { FormInputs, FormDetails } from '../../ui';

interface TransferOwnershipProps {
	domainName: string;
	domainTitle: string;
	domainCreator: string;
	helperText: string;
	setHelperText: (text: string) => void;
	onConfirm: (inputAdrressValue: string) => void;
}

export const Details: FC<TransferOwnershipProps> = ({
	domainName,
	domainTitle,
	domainCreator,
	helperText,
	setHelperText,
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
				label={'Ethereum Wallet'}
				error={Boolean(helperText)}
				helperText={helperText}
				placeholder={'Ethereum Wallet'}
				setHelperText={setHelperText}
				instructionText={'Enter recipient address:'}
				onSubmit={onConfirm}
			/>
		</>
	);
};
