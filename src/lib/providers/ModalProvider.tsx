//- React Imports
import { createContext, ReactNode, useState } from 'react';

//- Component Imports
import Modal from 'zero-ui/src/components/Modal';
import PlaceBid from '../../features/modals/PlaceBid/PlaceBid';
import BuyNow from '../../features/modals/BuyNow/BuyNow';
import ConnectWalletPrompt from '../../features/modals/ConnectWalletPrompt/ConnectWalletPrompt';

// Modal Type Imports
import * as modalTypes from '../types/modals';

//- Constants Imports
import { ModalType } from '../../lib/constants/modals';

export const ModalContext = createContext<modalTypes.ModalContextProps>({
	openModal: () => {},
	closeModal: () => {},
	modalContent: null,
});

interface ModalProviderProps {
	children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
	const [modalContent, setModalContent] =
		useState<modalTypes.ModalContent | null>(null);

	const closeModal = () => {
		setModalContent(null);
	};

	const openModal = (state: modalTypes.ModalContent) => {
		setModalContent(state);
	};

	return (
		<ModalContext.Provider value={{ closeModal, modalContent, openModal }}>
			{children}

			<Modal open={modalContent !== null} onOpenChange={closeModal}>
				{modalContent?.modalType === ModalType.CONNECT_WALLET_PROMPT && (
					<ConnectWalletPrompt onClose={closeModal} />
				)}
				{modalContent?.modalType === ModalType.PLACE_BID && (
					<PlaceBid
						domainName={modalContent.contentProps.domainName}
						onClose={closeModal}
					/>
				)}
				{modalContent?.modalType === ModalType.BUY_NOW && (
					<BuyNow
						domainName={modalContent.contentProps.domainName}
						onClose={closeModal}
					/>
				)}
			</Modal>
		</ModalContext.Provider>
	);
};
