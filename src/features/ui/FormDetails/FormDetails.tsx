import { FC } from 'react';

import { truncateAddress } from '../../../lib/util/domains/domains';
import { MemberTitle } from '../../../lib/constants/labels';

import styles from './FormDetails.module.scss';

interface FormDetailsProps {
	name: string;
	title: string;
	creator: string;
}

export const FormDetails: FC<FormDetailsProps> = ({ name, title, creator }) => {
	const truncatedAddress = truncateAddress(creator);

	return (
		<div className={styles.DetailsContainer}>
			<div className={styles.Media}></div>
			<div className={styles.Details}>
				<h1 className={styles.DomainTitle}>{title}</h1>
				<span className={styles.Domain}>0://{name}</span>

				<span className={styles.MemberTitle}>{MemberTitle.CREATOR}</span>
				<span className={styles.MemberAddress}>{truncatedAddress}</span>
			</div>
		</div>
	);
};
