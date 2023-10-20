import { Step, MediaType } from '@zero-tech/zui/components';

export const steps: Step[] = [
	{
		id: 'details',
		title: 'Details',
	},
	{
		id: 'tokenomics',
		title: 'Tokenomics',
	},
	{
		id: 'launch',
		title: 'Launch',
	},
];

export interface DetailsFormSubmit {
	mediaType: MediaType | undefined;
	previewUrl: string;
	avatar?: Buffer;
	name: string;
	symbol: string;
}

export interface TokenomicsFormSubmit {
	tokenCount: string;
	initialTokenSupplyWalletAddress: string;
	adminWalletAddress: string;
}
