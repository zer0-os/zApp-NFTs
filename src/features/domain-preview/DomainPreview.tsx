import { FC } from 'react';
import { Link } from 'react-router-dom';

import { truncateAddress } from '../../lib/util/domains/domains';
import { MemberTitle } from '../../lib/constants/labels';
import { useDataContainer } from '../../lib/hooks/useDataContainer';

import { Options } from './Options';

import classNames from 'classnames/bind';
import styles from './DomainPreview.module.scss';

const cx = classNames.bind(styles);

type DomainPreviewProps = {
	domainId: string;
};

export const DomainPreview: FC<DomainPreviewProps> = ({ domainId }) => {
	const { domain, domainMetadata, isNFTView } = useDataContainer(domainId);

	const members = [
		{ title: MemberTitle.CREATOR, address: domain?.minter },
		{ title: MemberTitle.OWNER, address: domain?.owner },
	];

	return (
		<>
			<div className={styles.Container}>
				{/* TODO: media asset component */}
				<img
					className={cx(styles.Banner, {
						isNFTView: isNFTView,
					})}
					src={'banner'}
				/>

				<div
					className={cx(styles.Content, {
						isNFTView: isNFTView,
					})}
				>
					{/* TODO: media asset component */}
					{!isNFTView && <img src={'icon'} className={styles.Icon}></img>}
					<div className={styles.DetailsContainer}>
						{domainMetadata?.title && (
							<h1 className={styles.Title}>{domainMetadata?.title}</h1>
						)}

						<div className={styles.DetailsRow}>
							{/* TODO: member component */}
							{isNFTView && domain?.minter && domain?.owner && (
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

							<Options domainId={domainId} />
						</div>

						{domainMetadata?.description && (
							<p className={styles.Description}>
								{domainMetadata?.description}
							</p>
						)}

						{!isNFTView && (
							<div className={styles.LinkContainer}>
								{/* TODO: arrow link component */}
								<Link
									className={styles.Link}
									to={`/${domain?.name}/nfts?view=true`}
								>
									{'View Domain NFT ->'}
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
