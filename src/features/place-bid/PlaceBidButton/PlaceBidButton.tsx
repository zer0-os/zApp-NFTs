import { FC } from 'react';

import { usePlaceBidData } from '../usePlaceBidData';

import { PlaceBidModal } from '..';

type PlaceBidButtonProps = {
	domainId: string;
	isRoot?: boolean;
};

export const PlaceBidButton: FC<PlaceBidButtonProps> = ({
	domainId,
	isRoot,
}) => {
	const { tokenBalance } = usePlaceBidData(domainId);

	return (
		<PlaceBidModal
			trigger={isRoot ? 'Bid' : 'Place A Bid'}
			domainId={domainId}
			tokenBalance={tokenBalance}
		/>
	);
};
