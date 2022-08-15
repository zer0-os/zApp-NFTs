//- React Imports
import type { FC } from 'react';

//- zUI Imports
import Modal from 'zero-ui/src/components/Modal';

type PlaceBidProps = {
	domainName: string;
	onClose: () => void;
};

export const PlaceBid: FC<PlaceBidProps> = ({ domainName, onClose }) => {
	return (
		<Modal open onOpenChange={onClose}>
			Place A Bid - {domainName}
		</Modal>
	);
};

export default PlaceBid;
