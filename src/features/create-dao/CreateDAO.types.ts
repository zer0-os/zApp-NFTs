import { Step } from '@zero-tech/zui/components';
import { MediaType } from '@zero-tech/zui/components/MediaInput';

export const steps: Step[] = [
	{
		id: 'details',
		title: 'Details',
	},
	{
		id: 'governance',
		title: 'Governance',
	},
	{
		id: 'treasury',
		title: 'Treasury',
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
	znaAddress: string;
	description: string;
}

export interface GovernanceFormSubmit {
	votingProcess: string;
	votingPeriod: string;
	votingSystem: string;
	daoTokenAddress: string;
	votingThreshold: string;
}

export interface TreasuryFormSubmit {
	gnosisSafe: string;
}
