export type TransferErrorType = 'transaction' | 'input';

export type TransferError = {
	message: string;
	type?: TransferErrorType;
};
