import { FC } from 'react';

import { MemberTitle } from '../../../lib/constants/labels';
import { useDomainData } from '../../../lib/hooks/useDomainData';
import { truncateAddress } from '../../../lib/util/domains/domains';
import { getDomainId } from '../../../lib/util/domains/domains';
import { useDomainMetadata } from '../../../lib/hooks/useDomainMetadata';

import { IpfsMedia } from '@zero-tech/zapp-utils/components';

import styles from './FormDetails.module.scss';

interface FormDetailsProps {
	zna: string;
}

export const FormDetails: FC<FormDetailsProps> = ({ zna }) => {
	const domainId = getDomainId(zna);

	const { data: domain } = useDomainData(domainId);
	const { data: metadata } = useDomainMetadata(domainId);
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
