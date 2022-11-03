import { FC } from 'react';

import { MemberTitle } from '../../../lib/constants/labels';

import { Member } from '../Member';
import { IpfsMedia } from '@zero-tech/zapp-utils/components';

import styles from './FormDetails.module.scss';

interface FormDetailsProps {
	name: string;
	title: string;
	creator: string;
	imageSrc: string;
	imageAlt: string;
}

export const FormDetails: FC<FormDetailsProps> = ({
	name,
	title,
	creator,
	imageSrc,
	imageAlt,
}) => {
	return (
		<div className={styles.DetailsContainer}>
			<IpfsMedia className={styles.Media} alt={imageAlt} src={imageSrc} />
			<div className={styles.Details}>
				<h1 className={styles.DomainTitle}>{title}</h1>
				<span className={styles.Domain}>0://{name}</span>

				<div className={styles.MemberContainer}>
					<Member
						title={MemberTitle.CREATOR}
						walletAddress={creator}
						variant={'secondary'}
					/>
				</div>
			</div>
		</div>
	);
};
