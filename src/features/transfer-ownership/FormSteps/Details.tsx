import { FC } from 'react';

import { useDataContainer } from '../../../lib/hooks/useDataContainer';

import { FormInputs, FormDetails } from '../../ui';

interface DetailsProps {
	domainId: string;
	error: string;
	onConfirm: (inputAdrressValue: string) => void;
}

export const Details: FC<DetailsProps> = ({ domainId, error, onConfirm }) => {
	const { domain, domainMetadata } = useDataContainer(domainId);

	const imageSrc = domainMetadata?.previewImage ?? domainMetadata?.image;
	const imageAlt = domainMetadata?.name ?? domain?.name;

	return (
		<>
			<FormDetails
				name={domain?.name}
				title={domainMetadata?.title}
				creator={domain?.minter}
				imageSrc={imageSrc}
				imageAlt={imageAlt}
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
