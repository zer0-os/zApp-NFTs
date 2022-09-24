//- Features Imports
import { ConnectWalletPromptProps } from '../../features/modals/ConnectWalletPrompt/ConnectWalletPrompt';
import { PlaceBidProps } from '../../features/modals/PlaceBid/PlaceBid';
import { BuyNowProps } from '../../features/modals/BuyNow/BuyNow';
import { SetBuyNowProps } from '../../features/modals/SetBuyNow/SetBuyNow';
import { ViewBidsProps } from '../../features/modals/ViewBids/ViewBids';
import { CancelBidProps } from '../../features/modals/CancelBid/CancelBid';
import { CreateTokenProps } from '../../features/modals/CreateToken';

//- Constants Imports
import { ModalType } from '../../lib/constants/modals';

export type ConnectWalletPromptContentProps = Omit<
	ConnectWalletPromptProps,
	'closeModal'
>;

export type PlaceBidContentProps = Omit<PlaceBidProps, 'closeModal'>;

export type BuyNowContentProps = Omit<BuyNowProps, 'closeModal'>;

export type SetBuyNowContentProps = Omit<SetBuyNowProps, 'closeModal'>;

export type ViewBidsContentProps = Omit<ViewBidsProps, 'closeModal'>;

export type CancelBidContentProps = Omit<CancelBidProps, 'closeModal'>;

export type CreateTokenContentProps = Omit<CreateTokenProps, 'closeModal'>;

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

type SetBuyNowContent = {
	modalType: ModalType.SET_BUY_NOW;
	contentProps: SetBuyNowContentProps;
};

type ViewBidsContent = {
	modalType: ModalType.VIEW_BIDS;
	contentProps: ViewBidsContentProps;
};

type CancelBidContent = {
	modalType: ModalType.CANCEL_BID;
	contentProps: CancelBidContentProps;
};

type CreateTokenContent = {
	modalType: ModalType.CREATE_TOKEN;
	contentProps: CreateTokenContentProps;
};

export type ModalContent =
	| ConnectWalletPromptContent
	| PlaceBidContent
	| BuyNowContent
	| SetBuyNowContent
	| ViewBidsContent
	| CancelBidContent
	| CreateTokenContent;

export type ModalContextProps = {
	openModal: (content: ModalContent) => void;
	closeModal: () => void;
	modalContent: ModalContent | null;
};
