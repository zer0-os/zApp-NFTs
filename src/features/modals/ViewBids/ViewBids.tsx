//- React Imports
import { FC } from 'react';

export type ViewBidsProps = {
	domainName: string;
	onClose: () => void;
};

const ViewBids: FC<ViewBidsProps> = ({ domainName, onClose }) => (
	<>View Bids - {domainName}</>
);

export default ViewBids;
