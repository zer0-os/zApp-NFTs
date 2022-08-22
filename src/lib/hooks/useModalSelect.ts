//- Hook Imports
import { useModal } from './useModal';

//- Constants Imports
import { ModalType } from '../constants/modals';

type UseModalSelectReturn = {
	handleModal: () => void;
};

export const useModalSelect = (accountId?: string): UseModalSelectReturn => {
	const { openModal, closeModal } = useModal();

	// todo: handle modal will need expanding when modal content is added
	const handleModal = (domainName?: string, type?: ModalType) => {
		type &&
			accountId &&
			openModal({
				modalType: type,
				contentProps: {
					domainName: domainName,
					onClose: closeModal,
				},
			});
		!accountId &&
			openModal({
				modalType: ModalType.CONNECT_WALLET_PROMPT,
				contentProps: {
					onClose: closeModal,
				},
			});
	};

	return { handleModal };
};
