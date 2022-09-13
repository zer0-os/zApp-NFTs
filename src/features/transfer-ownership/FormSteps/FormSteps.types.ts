export type ConfirmStepProps = {
	onConfirm?: () => void;
	onClose?: () => void;
	errorMessage?: string;
	isTransferring?: boolean;
};
