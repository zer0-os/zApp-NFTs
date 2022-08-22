//- React Imports
import { FC } from 'react';

export type SetBuyNowProps = {
	domainName: string;
	onClose: () => void;
};

const SetBuyNow: FC<SetBuyNowProps> = ({ domainName, onClose }) => (
	<>Set/Edit Buy Now - {domainName}</>
);

export default SetBuyNow;
