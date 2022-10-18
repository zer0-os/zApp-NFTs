import { FC } from 'react';
import { Link } from 'react-router-dom';

import { truncateAddress } from '../../lib/util/domains/domains';
import { MemberTitle } from '../../lib/constants/labels';

import { Options } from '../Options';
import { SkeletonText } from '@zero-tech/zui/components';

import classNames from 'classnames/bind';
import styles from './DomainPreview.module.scss';

const cx = classNames.bind(styles);

type DomainPreviewProps = {
	id?: string;
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
	id,
	title,
	description,
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
			<img
				className={cx(styles.Banner, {
					isNFTView: isNFTView,
				})}
				src={banner}
			/>

			<div
				className={cx(styles.Content, {
					isNFTView: isNFTView,
				})}
			>
				{/* TODO: media asset component */}
				{!isNFTView && <img src={banner} className={styles.Icon}></img>}
				<div className={styles.TextContainer}>
					<SkeletonText
						as={'h1'}
						className={styles.Title}
						asyncText={{ text: title, isLoading: !title }}
						skeletonOptions={{ width: '50%' }}
					/>
					{/*{title && <h1 className={styles.Title}>{title}</h1>}*/}

					{/* TODO: member component */}
					{isNFTView && (
						<div className={styles.DetailsRow}>
							<ul className={styles.MemberContainer}>
								{members.map((member) => (
									<li key={member.title} className={styles.MemberItem}>
										<span className={styles.MemberTitle}>{member.title}</span>
										<SkeletonText
											as={'span'}
											className={styles.MemberAddress}
											asyncText={{
												text: member?.address
													? truncateAddress(member.address)
													: undefined,
												isLoading: !member?.address,
											}}
										/>
									</li>
								))}
							</ul>

							<Options domainId={id} />
						</div>
					)}

					<SkeletonText
						as={'p'}
						asyncText={{ text: description, isLoading: !description }}
						className={styles.Description}
					/>

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
