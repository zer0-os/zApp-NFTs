import { FC, ReactNode } from 'react';

import { SetBuyNowModal } from './SetBuyNowModal';

type SetBuyNowButtonProps = {
	trigger: ReactNode;
};

export const SetBuyNowButton: FC<SetBuyNowButtonProps> = ({ trigger }) => (
	<SetBuyNowModal trigger={trigger} />
);
