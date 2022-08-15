//- React Imports
import { FC } from 'react';

export type PlaceBidProps = {
	domainName: string;
	onClose: () => void;
};

export const PlaceBid: FC<PlaceBidProps> = ({ domainName, onClose }) => (
	<>Place Bid - {domainName}</>
);

export default PlaceBid;
