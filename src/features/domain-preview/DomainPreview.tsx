import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { useWeb3 } from '../../lib/hooks/useWeb3';
import { truncateAddress } from '../../lib/util/domains/domains';
import { MemberTitle } from '../../lib/constants/labels';

import { TransferOwnershipModal } from '../../features/transfer-ownership';
import { DropdownMenu } from '@zero-tech/zui/components';
import { IconDots, IconSend } from './Icons';

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
	const { account } = useWeb3();

	const members = [
		{ title: MemberTitle.CREATOR, address: creator },
		{ title: MemberTitle.OWNER, address: owner },
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
			domainId={''}
			domainName={''}
			domainTitle={''}
			domainOwner={''}
			domainCreator={''}
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
					src={banner}
				/>

				<div
					className={cx(styles.Content, {
						isNFTView: isNFTView,
					})}
				>
					{/* TODO: media asset component */}
					{!isNFTView && <img src={banner} className={styles.Icon}></img>}
					<div className={styles.DetailsContainer}>
						{title && <h1 className={styles.Title}>{title}</h1>}

						<div className={styles.DetailsRow}>
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

							{isNFTView && owner !== account && (
								<div className={styles.OptionsTray}>
									<DropdownMenu
										items={moreOptions}
										side="bottom"
										alignMenu="end"
										trigger={<IconDots />}
									/>
								</div>
							)}
						</div>

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
		</>
	);
};
