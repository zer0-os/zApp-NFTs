import { FC } from 'react';

import { truncateAddress } from '../../../lib/util/domains/domains';
import { MemberTitle } from '../../../lib/constants/labels';

import styles from './Members.module.scss';

type MembersProps = {
	creator: string;
	owner: string;
};

export const Members: FC<MembersProps> = ({ creator, owner }) => {
	const members = [
		{ title: MemberTitle.CREATOR, address: creator },
		{ title: MemberTitle.OWNER, address: owner },
	];

	return (
		<ul className={styles.MemberContainer}>
			{members.map((member) => (
				<li key={member.title} className={styles.MemberItem}>
					<span className={styles.MemberTitle}>{member.title}</span>
					<span className={styles.MemberAddress}>
						{truncateAddress(member.address)}
					</span>
				</li>
			))}
		</ul>
	);
};
