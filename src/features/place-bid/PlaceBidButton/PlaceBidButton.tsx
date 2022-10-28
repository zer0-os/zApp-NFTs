import { FC } from 'react';

import { usePlaceBidData } from '../usePlaceBidData';

import { PlaceBidModal } from '..';
import { getDomainId } from '../../../lib/util';

type PlaceBidButtonProps = {
	zna: string;
	isRoot?: boolean;
};

export const PlaceBidButton: FC<PlaceBidButtonProps> = ({ zna, isRoot }) => {
	const { balanceAsString } = usePlaceBidData(zna);

	return (
		<PlaceBidModal
			trigger={isRoot ? 'Bid' : 'Place A Bid'}
			zna={zna}
			tokenBalance={balanceAsString}
		/>
	);
};
