import { FC } from 'react';

import { AcceptBidModal, AcceptBidModalProps } from '..';

export interface AcceptBidButtonProps {
	zna: AcceptBidModalProps['zna'];
	bid: AcceptBidModalProps['bid'];
}

export const AcceptBidButton: FC<AcceptBidButtonProps> = ({ zna, bid }) => (
	<AcceptBidModal trigger={'Accept'} bid={bid} zna={zna} />
);
