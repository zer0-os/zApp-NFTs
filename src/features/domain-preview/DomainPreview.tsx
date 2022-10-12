import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { useWeb3 } from '../../lib/hooks/useWeb3';
import { truncateAddress } from '../../lib/util/domains/domains';
import { MemberTitle } from '../../lib/constants/labels';
import { useDataContainer } from '../../lib/hooks/useDataContainer';

import { TransferOwnershipModal } from '../../features/transfer-ownership';
import { IconDots, IconSend } from './Icons';
import { DropdownMenu } from '@zero-tech/zui/components';

import classNames from 'classnames/bind';
import styles from './DomainPreview.module.scss';

const cx = classNames.bind(styles);

type DomainPreviewProps = {
	domainId: string;
};

export const DomainPreview: FC<DomainPreviewProps> = ({ domainId }) => {
	const { account } = useWeb3();
	const { domain, domainMetadata, isNFTView } = useDataContainer(domainId);

	const members = [
		{ title: MemberTitle.CREATOR, address: domain?.minter },
		{ title: MemberTitle.OWNER, address: domain?.owner },
	];

	const [modal, setModal] = useState('');

	const moreOptions = [
		{
			id: 'Transfer',
			label: (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '1rem',
					}}
				>
					<IconSend />
					<div style={{ fontSize: '1rem', lineHeight: '1.5rem' }}>
						Transfer Ownership
					</div>
				</div>
			),
			onSelect: () => setModal('transfer'),
		},
	];

	const modals = () => (
		<TransferOwnershipModal
			open={modal === 'transfer'}
			domainId={domainId}
			domainName={domain?.name}
			domainTitle={domainMetadata?.title}
			domainOwner={domain?.owner}
			domainCreator={domain?.minter}
			onClose={() => {}}
		/>
	);

	return (
		<>
			{modals()}
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

							{isNFTView && domain?.owner !== account && (
								<div className={styles.OptionsTray}>
									<DropdownMenu
										className={styles.MoreOptionsMenu}
										items={moreOptions}
										side="bottom"
										alignMenu="end"
										trigger={<IconDots />}
									/>
								</div>
							)}
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
