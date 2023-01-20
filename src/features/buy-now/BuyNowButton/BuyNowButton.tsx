import { FC, ReactNode } from 'react';

import { BuyNowModal } from '..';

interface BuyNowButtonProps {
	zna: string;
	trigger: ReactNode;
}

export const BuyNowButton: FC<BuyNowButtonProps> = ({ zna, trigger }) => {
	return <BuyNowModal zna={zna} trigger={trigger} />;
};
