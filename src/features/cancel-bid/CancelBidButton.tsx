//- React Imports
import { FC } from 'react';

//- Components Imports
import { CancelBidModal } from './CancelBidModal';

export const CancelBidButton: FC = () => (
	<CancelBidModal trigger={'Cancel Bid'} />
);
