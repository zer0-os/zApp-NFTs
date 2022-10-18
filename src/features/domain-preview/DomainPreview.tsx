import { FC } from 'react';
import { Link } from 'react-router-dom';

import { truncateAddress } from '../../lib/util/domains/domains';
import { MemberTitle } from '../../lib/constants/labels';

import { Image } from '@zero-tech/zui/components/Image';

import classNames from 'classnames/bind';
import styles from './DomainPreview.module.scss';

const cx = classNames.bind(styles);

type DomainPreviewProps = {
	title?: string;
	description?: string;
	icon?: string;
	banner?: string;
	href?: string;
	owner?: string;
	creator?: string;
	isNFTView?: boolean;
};

export const DomainPreview: FC<DomainPreviewProps> = ({
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

	return (
		<div className={styles.Container}>
			{/* TODO: media asset component */}

			<Image
				alt={`${title ?? 'loading'} nft image banner`}
				className={cx(styles.Banner, {
					isNFTView: isNFTView,
				})}
				src={banner}
				objectFit={isNFTView ? 'contain' : 'cover'}
			/>

			<div
				className={cx(styles.Content, {
					isNFTView: isNFTView,
				})}
			>
				{/* TODO: media asset component */}
				{!isNFTView && (
					<Image
						alt={`${title ?? 'loading'} nft thumbnail`}
						className={styles.Icon}
						src={banner}
					/>
				)}
				<div className={styles.TextContainer}>
					{title && <h1 className={styles.Title}>{title}</h1>}

					{/* TODO: member component */}
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
							{/* TODO: arrow link component */}
							<Link className={styles.Link} to={href}>
								{'View Domain NFT ->'}
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
