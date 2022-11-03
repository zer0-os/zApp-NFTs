import { getDomainId } from '../../../lib/util';
import { useDomainData } from '../../../lib/hooks/useDomainData';
import { useDomainMetadata } from '../../../lib/hooks/useDomainMetadata';

import { FC } from 'react';

import { FormInputs, FormDetails } from '../../ui';

interface DetailsProps {
	zna: string;
	error: string;
	onConfirm: (inputAdrressValue: string) => void;
}

export const Details: FC<DetailsProps> = ({ zna, error, onConfirm }) => {
	const domainId = getDomainId(zna);

	const { data: domain } = useDomainData(domainId);
	const { data: metadata } = useDomainMetadata(domainId);

	const imageSrc = metadata?.previewImage ?? metadata?.image;
	const imageAlt = metadata?.name ?? domain?.name + ' image';

	return (
		<>
			<FormDetails
				name={domain?.name}
				title={metadata?.title}
				creator={domain?.minter}
				imageAlt={imageAlt}
				imageSrc={imageSrc}
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
