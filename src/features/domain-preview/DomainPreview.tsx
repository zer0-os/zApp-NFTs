// React Imports
import { FC } from 'react';
import { Link } from 'react-router-dom';

//- Utils Imports
import { truncateAddress } from '../../lib/util/domains/domains';

//- Constants Imports
import { MemberTitle } from './DomainPreview.constants';

//- Styles Imports
import styles from './DomainPreview.module.scss';

type PreviewCardProps = {
	title?: string;
	description?: string;
	icon?: string;
	banner?: string;
	href?: string;
	owner?: string;
	creator?: string;
	isNFTView?: boolean;
};

const ViewContainerNFTCard: FC<PreviewCardProps> = ({
	title,
	description,
	icon,
	banner,
	href,
	owner,
	creator,
	isNFTView,
}) => {
	const members = [
		{ title: MemberTitle.CREATOR, address: creator },
		{ title: MemberTitle.OWNER, address: owner },
	];
	console.log(isNFTView !== undefined);

	return (
		<div className={styles.Container}>
			{title && <h1 className={styles.Title}>{title}</h1>}

			{isNFTView && creator && owner && (
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
			)}

			{description && <p className={styles.Description}>{description}</p>}

			{href && (
				<div className={styles.LinkContainer}>
					<Link className={styles.Link} to={href}>
						{'View Domain NFT ->'}
					</Link>
				</div>
			)}
		</div>
	);
};

export default ViewContainerNFTCard;
