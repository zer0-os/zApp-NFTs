//- Features Imports
import { PlaceBidProps } from '../../features/modals/PlaceBid/PlaceBid';
import { BuyNowProps } from '../../features/modals/BuyNow/BuyNow';

//- Constants Imports
import { ModalType } from '../../lib/constants/modals';

export type PlaceBidContentProps = Omit<PlaceBidProps, 'closeModal'>;

export type BuyNowContentProps = Omit<BuyNowProps, 'closeModal'>;

type PlaceBidContent = {
	modalType: ModalType.PLACE_BID;
	contentProps: PlaceBidContentProps;
};

type BuyNowContent = {
	modalType: ModalType.BUY_NOW;
	contentProps: BuyNowContentProps;
};

export type ModalContent = PlaceBidContent | BuyNowContent;

export type ModalContextProps = {
	openModal: (content: ModalContent) => void;
	closeModal: () => void;
	modalContent: ModalContent | null;
};
