import { FC } from 'react';

import { PlaceBidModal } from '../PlaceBidModal';

type PlaceBidButtonProps = {
	domainId: string;
	isRoot?: boolean;
};

export const PlaceBidButton: FC<PlaceBidButtonProps> = ({
	domainId,
	isRoot,
}) => (
	<PlaceBidModal trigger={isRoot ? 'Bid' : 'Place A Bid'} domainId={domainId} />
);
