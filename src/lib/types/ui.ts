//- Components Imports
import { ModalProps } from '@zero-tech/zui/src/components/Modal';

export interface BasicModalProps {
	open?: ModalProps['open'];
	trigger?: ModalProps['trigger'];
	onOpenChange?: ModalProps['onOpenChange'];
}
