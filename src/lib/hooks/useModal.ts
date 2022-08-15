//- React Imports
import { useContext } from 'react';

//- Lib Imports
import { ModalContext } from '../providers/ModalProvider';

export const useModal = () => useContext(ModalContext);
