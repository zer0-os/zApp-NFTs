import { FC, ReactNode } from 'react';

import { BuyNowModal } from './BuyNowModal';

type BuyNowButtonProps = {
	zna: string;
	trigger: ReactNode;
};

export const BuyNowButton: FC<BuyNowButtonProps> = ({ zna, trigger }) => (
	<BuyNowModal trigger={trigger} />
);
