import { FC, ReactNode } from 'react';

import { PlaceBidModal } from '..';

type PlaceBidButtonProps = {
	zna: string;
	trigger: ReactNode;
};

export const PlaceBidButton: FC<PlaceBidButtonProps> = ({ zna, trigger }) => {
	return <PlaceBidModal trigger={trigger} zna={zna} />;
};
