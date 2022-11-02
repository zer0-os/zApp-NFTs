import { FC, ReactNode } from 'react';

import { usePlaceBidData } from '../usePlaceBidData';

import { PlaceBidModal } from '..';

type PlaceBidButtonProps = {
	zna: string;
	trigger: ReactNode;
};

export const PlaceBidButton: FC<PlaceBidButtonProps> = ({ zna, trigger }) => {
	const { balanceAsString } = usePlaceBidData(zna);

	return (
		<PlaceBidModal trigger={trigger} zna={zna} tokenBalance={balanceAsString} />
	);
};
