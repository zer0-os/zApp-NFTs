import { FC } from 'react';

import { useDomainData } from '../../../lib/hooks/useDomainData';
import { useDomainMetadata } from '../../../lib/hooks/useDomainMetadata';
import { truncateAddress } from '../../../lib/util/domains/domains';
import { MemberTitle } from '../../../lib/constants/labels';

import { IpfsMedia } from '@zero-tech/zapp-utils/components';

import styles from './FormDetails.module.scss';

interface FormDetailsProps {
	domainId: string;
}

export const FormDetails: FC<FormDetailsProps> = ({ domainId }) => {
	const { data: domain } = useDomainData(domainId);
	const { data: metadata } = useDomainMetadata(domain?.metadataUri);
	const truncatedAddress = truncateAddress(domain?.minter);

	const imageSrc = metadata?.previewImage ?? metadata?.image;
	const imageAlt = metadata?.name ?? domain?.name + ' image';

	return (
		<div className={styles.DetailsContainer}>
			<IpfsMedia className={styles.Media} alt={imageAlt} src={imageSrc} />
			<div className={styles.Details}>
				<h1 className={styles.DomainTitle}>{metadata?.title}</h1>
				<span className={styles.Domain}>0://{domain?.name}</span>

				<span className={styles.MemberTitle}>{MemberTitle.CREATOR}</span>
				<span className={styles.MemberAddress}>{truncatedAddress}</span>
			</div>
		</div>
	);
};
