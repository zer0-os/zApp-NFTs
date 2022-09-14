export type StepProps = {
	onConfirm?: () => void;
	onClose?: () => void;
	errorMessage?: string;
	isTransferring?: boolean;
};
