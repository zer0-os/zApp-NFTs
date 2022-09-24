// React Imports
import { FC } from 'react';
import { Link } from 'react-router-dom';

//- Utils Imports
import { truncateAddress } from '../../../lib/util/domains/domains';

//- Constants Imports
import { AddressTitle, ButtonTitle } from './NFTCard.constants';

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
	return (
		<>
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
					{ButtonTitle.VIEW_DOMAIN_NFT}
				</Link>
			)}
		</>
	);
};

export default ViewContainerNFTCard;
