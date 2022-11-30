import { FC } from 'react';

import { AcceptBidModal } from '..';

import { Bid } from '@zero-tech/zauction-sdk';

export interface AcceptBidButtonProps {
	zna: string;
	bid: Bid;
}

export const AcceptBidButton: FC<AcceptBidButtonProps> = ({ zna, bid }) => (
	<AcceptBidModal trigger={'Accept'} bid={bid} zna={zna} />
);
