import { FC } from 'react';
import { Link } from 'react-router-dom';

import { truncateAddress } from '../../lib/util/domains/domains';

import { AddressTitle } from './DomainPreview.constants';

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
	return (
		<div style={{ margin: '16px 0' }}>
			{title && <h1>{title}</h1>}

			{isNFTView && creator && owner && (
				<ul style={{ display: 'flex', padding: '0', listStyle: 'none' }}>
					<li style={{ display: 'flex', flexDirection: 'column' }}>
						<span>{AddressTitle.CREATOR}</span>
						<span>{truncateAddress(creator)}</span>
					</li>
					<li
						style={{
							display: 'flex',
							marginLeft: '32px',
							flexDirection: 'column',
						}}
					>
						<span>{AddressTitle.OWNER}</span>
						<span>{truncateAddress(owner)}</span>
					</li>
				</ul>
			)}

			{description && <p>{description}</p>}

			{href && (
				<Link style={{ background: 'none', color: '#52cbff' }} to={href}>
					{'View Domain NFT ->'}
				</Link>
			)}
		</div>
	);
};
