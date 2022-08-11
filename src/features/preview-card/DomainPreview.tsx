// React Imports
import { FC } from 'react';

type PreviewCardProps = {
	title: string;
	description: string;
};

const PreviewCard: FC<PreviewCardProps> = ({ title, description }) => {
	const onClick = () => {
		console.log('onClick');
	};

	return (
		<>
			<div>{title}</div>
			<div>{description}</div>

			<button style={{ background: 'purple' }} onClick={onClick}>
				{'View Domain NFT ->'}
			</button>
		</>
	);
};

export default PreviewCard;
