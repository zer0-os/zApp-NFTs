import { StakingRequests } from '@zero-tech/zns-sdk';

import { Step } from '@zero-tech/zui/components';

export enum FormStep {
	DETAILS = 'details',
	CONFIRM = 'confirm',
	COMPLETE = 'complete',
}

export enum ConfirmActionType {
	LOCK = 'lock',
	UNLOCK = 'unlock',
	SAVE_AND_LOCK = 'save-and-lock',
	SAVE_WITHOUT_LOCKING = 'save-without-locking',
}

export const steps: Step[] = [
	{
		id: 'details',
		title: 'Details',
	},
	{
		id: 'confirm',
		title: 'Confirm',
	},
	{
		id: 'complete',
		title: 'Complete',
	},
];

export type FieldValues = {
	title: string;
	description: string;
	isMintable: boolean;
	isBiddable: boolean;
	gridViewByDefault: boolean;
	customDomainHeader: boolean;
	customDomainHeaderValue: string;
};

export interface DetailsFormSubmit {
	title: string;
	description: string;
	attributes: any;
	image: string;
	image_full: string;
	previewImage: string;
	animation_url: string;
	stakingRequests: StakingRequests;
	isMintable: boolean;
	isBiddable: boolean;
	gridViewByDefault: boolean;
	customDomainHeader: boolean;
	customDomainHeaderValue: string;
}
