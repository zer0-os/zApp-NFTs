import { FC } from 'react';

import { useAcceptBidData } from '../useAcceptBidData';

import { AcceptBidModal } from '..';

type AcceptBidButtonProps = {
	domainId: string;
};

export const AcceptBidButton: FC<AcceptBidButtonProps> = ({ domainId }) => {
	const {} = useAcceptBidData(domainId);

	return (
		<AcceptBidModal trigger={'Accept'} domainId={domainId} bidAmount={''} />
	);
};
