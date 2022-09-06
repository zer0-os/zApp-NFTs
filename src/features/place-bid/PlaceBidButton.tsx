import { FC } from 'react';

import { PlaceBidModal } from './PlaceBidModal';

type PlaceBidButtonProps = {
	isRoot?: boolean;
};

export const PlaceBidButton: FC<PlaceBidButtonProps> = ({ isRoot }) => (
	<PlaceBidModal trigger={isRoot ? 'Bid' : 'Place A Bid'} />
);
