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
	const { balanceAsString } = usePlaceBidData(domainId);

	return (
		<PlaceBidModal
			trigger={isRoot ? 'Bid' : 'Place A Bid'}
			domainId={domainId}
			tokenBalance={balanceAsString}
		/>
	);
};
