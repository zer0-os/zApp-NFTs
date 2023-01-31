import { StakingRequests } from '@zero-tech/zns-sdk';

import { Step } from '@zero-tech/zui/components';

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

export interface DetailsFormSubmit {
	// zna?: string;
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
