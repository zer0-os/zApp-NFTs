export enum Step {
	DETAILS,
	CONFIRM,
	TRANSACTION_APPROVAL,
	TRANSACTION_IN_PROGRESS,
	COMPLETE,
}

export enum ErrorType {
	INPUT = 'input',
	TRANSACTION = 'transaction',
}

export enum StepText {
	TRANSACTION_ALERT = 'This transaction is about to be seared upon the blockchain. There’s no going back.',
}
