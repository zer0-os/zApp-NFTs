//- React Imports
import type { FC } from 'react';

//- zUI Imports
import Modal from 'zero-ui/src/components/Modal';

type BuyNowProps = {
	domainName: string;
	onClose: () => void;
};

export const BuyNow: FC<BuyNowProps> = ({ domainName, onClose }) => {
	return (
		<Modal open onOpenChange={onClose}>
			Buy Now - {domainName}
		</Modal>
	);
};

export default BuyNow;
