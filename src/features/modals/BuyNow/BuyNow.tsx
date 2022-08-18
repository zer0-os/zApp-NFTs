//- React Imports
import { FC } from 'react';

export type BuyNowProps = {
	domainName: string;
	onClose: () => void;
};

export const BuyNow: FC<BuyNowProps> = ({ domainName, onClose }) => (
	<>Buy Now - {domainName}</>
);

export default BuyNow;