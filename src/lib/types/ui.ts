import { ModalProps } from '@zero-tech/zui/components/Modal';

export interface BasicModalProps {
	open?: ModalProps['open'];
	trigger?: ModalProps['trigger'];
	onOpenChange?: ModalProps['onOpenChange'];
}