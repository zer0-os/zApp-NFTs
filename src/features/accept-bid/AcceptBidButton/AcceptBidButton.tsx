import { FC } from 'react';

import { Bid } from '@zero-tech/zauction-sdk';

import { AcceptBidModal } from '..';

type AcceptBidButtonProps = {
	zna: string;
	bid: Bid;
};

export const AcceptBidButton: FC<AcceptBidButtonProps> = ({ zna, bid }) => (
	<AcceptBidModal trigger={'Accept'} bid={bid} zna={zna} />
);
