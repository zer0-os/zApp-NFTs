export enum TransferOwnershipFormStep {
	DETAILS,
	CONFIRM,
	TRANSACTION_APPROVAL,
	TRANSACTION_IN_PROGRESS,
	COMPLETE,
}

export const FormStepsText = {
	TRANSACTION_ALERT:
		'This transaction is about to be seared upon the blockchain. There’s no going back.',
};
