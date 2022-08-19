//- Hook Imports
import { useModal } from './useModal';

//- Constants Imports
import { ModalType } from '../constants/modals';

type UseModalSelectReturn = {
	handleModal: () => void;
};

export const useModalSelect = (): UseModalSelectReturn => {
	const { openModal, closeModal } = useModal();

	const handleModal = (domainName?: string, type?: ModalType) =>
		type !== ModalType.CONNECT_WALLET_PROMPT
			? openModal({
					modalType: type,
					contentProps: {
						domainName: domainName,
						onClose: closeModal,
					},
			  })
			: openModal({
					modalType: type,
					contentProps: {
						onClose: closeModal,
					},
			  });

	return { handleModal };
};
