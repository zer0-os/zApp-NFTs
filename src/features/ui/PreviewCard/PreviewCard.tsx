// React Imports
import { FC } from 'react';
import { Link } from 'react-router-dom';

type PreviewCardProps = {
	title?: string;
	description?: string;
	href?: string;
};

const PreviewCard: FC<PreviewCardProps> = ({ title, description, href }) => {
	return (
		<>
			<h1>{title}</h1>
			<p>{description}</p>
			{href && (
				<Link style={{ background: 'none', color: '#52cbff' }} to={href}>
					{'View Domain NFT ->'}
				</Link>
			)}
		</>
	);
};

export default PreviewCard;
