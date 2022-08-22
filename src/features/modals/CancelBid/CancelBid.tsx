//- React Imports
import { FC } from 'react';

export type CancelBidProps = {
	domainName: string;
	onClose: () => void;
};

const CancelBid: FC<CancelBidProps> = ({ domainName, onClose }) => (
	<>Cancel Bids - {domainName}</>
);

export default CancelBid;
