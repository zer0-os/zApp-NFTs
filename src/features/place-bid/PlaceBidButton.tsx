//- React Imports
import { FC } from 'react';

//- Components Imports
import { PlaceBidModal } from './PlaceBidModal';

type PlaceBidButtonProps = {
	isRoot?: boolean;
};

export const PlaceBidButton: FC<PlaceBidButtonProps> = ({ isRoot }) => (
	<PlaceBidModal trigger={isRoot ? 'Bid' : 'Place A Bid'} />
);
