import { ConfirmActionType } from './DomainSettings.types';

/**************************
 * COMPLETE_STEP_LABEL_TEXT
 **************************/

interface LabelType {
	label: string;
}

export const COMPLETE_STEP_LABEL_TEXT: {
	[action in ConfirmActionType]: LabelType;
} = {
	[ConfirmActionType.LOCK]: { label: 'Success. Metadata is locked' },
	[ConfirmActionType.UNLOCK]: {
		label: 'Success. Metadata is unlocked',
	},
	[ConfirmActionType.SAVE_AND_LOCK]: {
		label: 'Your changes have been saved and the metadata is locked',
	},
	[ConfirmActionType.SAVE_WITHOUT_LOCKING]: {
		label: 'Your changes have been saved',
	},
};

// /**************************
//  * CONFIRM_STEP_HEADER_TEXT
//  **************************/

interface HeaderType {
	confirmStepHeader?: string;
}

export const CONFIRM_STEP_HEADER_TEXT: {
	[action in ConfirmActionType]: HeaderType;
} = {
	[ConfirmActionType.LOCK]: {},
	[ConfirmActionType.UNLOCK]: {
		confirmStepHeader: 'Unlock Metadata?',
	},
	[ConfirmActionType.SAVE_AND_LOCK]: {
		confirmStepHeader: 'Save & Lock?',
	},
	[ConfirmActionType.SAVE_WITHOUT_LOCKING]: {
		confirmStepHeader: 'Save Without Locking',
	},
};

/****************************
 * CONFIRM_STEP_TEXT_CONTENT
 ***************************/

interface StepTextType {
	primaryButtonText?: string;
	message?: string;
}

export const CONFIRM_STEP_TEXT_CONTENT: {
	[action in ConfirmActionType]: StepTextType;
} = {
	[ConfirmActionType.LOCK]: {},
	[ConfirmActionType.UNLOCK]: {
		primaryButtonText: 'Unlock Metadata',
		message:
			'Unlocking metadata is a blockchain transaction that will cost gas. \nAdditional, optional, transactions are required to save changes and lock the metadata again.',
	},
	[ConfirmActionType.SAVE_AND_LOCK]: {
		primaryButtonText: 'Save & Lock',
		message:
			'Your changes will be saved and the metadata will be locked. \nYou will be the only one who can unlock it in the future.',
	},
	[ConfirmActionType.SAVE_WITHOUT_LOCKING]: {
		primaryButtonText: 'Save Without Locking',
		message:
			'If you transfer ownership of the domain while metadata is unlocked, the new owner can edit the metadata and lock it. You may lose access forever.',
	},
};

/************************
 * LOADING_TEXT_CONTENT
 ************************/

interface LoadingStepTextType {
	loadingHeader: string;
	loadingBody: string;
}

const transactionTimingPrompt =
	'\nThis may take up to 20 mins. Do not close this window or refresh your browser...';

export const LOADING_TEXT_CONTENT: {
	[action in ConfirmActionType]: LoadingStepTextType;
} = {
	[ConfirmActionType.LOCK]: {
		loadingHeader: 'Locking Metadata',
		loadingBody: `Locking metadata. ${transactionTimingPrompt}`,
	},
	[ConfirmActionType.UNLOCK]: {
		loadingHeader: 'Unlocking Metadata',
		loadingBody: `Unlocking Metadata. ${transactionTimingPrompt}`,
	},
	[ConfirmActionType.SAVE_AND_LOCK]: {
		loadingHeader: 'Save & Lock Metadata',
		loadingBody: `Saving & locking metadata. ${transactionTimingPrompt}`,
	},
	[ConfirmActionType.SAVE_WITHOUT_LOCKING]: {
		loadingHeader: 'Save Metadata Changes',
		loadingBody: `Saving metadata changes. ${transactionTimingPrompt}`,
	},
};
