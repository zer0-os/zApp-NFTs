import { FC, ReactNode } from 'react';

import { SetBuyNowModal } from '..';

interface SetBuyNowButtonProps {
	zna: string;
	trigger: ReactNode;
}

export const SetBuyNowButton: FC<SetBuyNowButtonProps> = ({ zna, trigger }) => {
	return <SetBuyNowModal zna={zna} trigger={trigger} />;
};
