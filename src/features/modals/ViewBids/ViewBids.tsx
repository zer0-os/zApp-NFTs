//- React Imports
import { FC } from 'react';

export type ViewBidsProps = {
	domainName: string;
	onClose: () => void;
};

export const ViewBids: FC<ViewBidsProps> = ({ domainName, onClose }) => (
	<>View Bids - {domainName}</>
);

export default ViewBids;
