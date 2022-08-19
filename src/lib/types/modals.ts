//- Features Imports
import { ConnectWalletPromptProps } from '../../features/modals/ConnectWalletPrompt/ConnectWalletPrompt';
import { PlaceBidProps } from '../../features/modals/PlaceBid/PlaceBid';
import { BuyNowProps } from '../../features/modals/BuyNow/BuyNow';
import { ViewBidsProps } from '../../features/modals/ViewBids/ViewBids';

//- Constants Imports
import { ModalType } from '../../lib/constants/modals';

export type ConnectWalletPromptContentProps = Omit<
	ConnectWalletPromptProps,
	'closeModal'
>;

export type PlaceBidContentProps = Omit<PlaceBidProps, 'closeModal'>;

export type BuyNowContentProps = Omit<BuyNowProps, 'closeModal'>;

export type ViewBidsContentProps = Omit<ViewBidsProps, 'closeModal'>;

type ConnectWalletPromptContent = {
	modalType: ModalType.CONNECT_WALLET_PROMPT;
	contentProps: ConnectWalletPromptContentProps;
};

type PlaceBidContent = {
	modalType: ModalType.PLACE_BID;
	contentProps: PlaceBidContentProps;
};

type BuyNowContent = {
	modalType: ModalType.BUY_NOW;
	contentProps: BuyNowContentProps;
};

type ViewBidsContent = {
	modalType: ModalType.VIEW_BIDS;
	contentProps: ViewBidsContentProps;
};

export type ModalContent =
	| ConnectWalletPromptContent
	| PlaceBidContent
	| BuyNowContent
	| ViewBidsContent;

export type ModalContextProps = {
	openModal: (content: ModalContent) => void;
	closeModal: () => void;
	modalContent: ModalContent | null;
};
