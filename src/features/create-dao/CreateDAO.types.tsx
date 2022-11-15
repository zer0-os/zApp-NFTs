import { IconLightning2 } from '@zero-tech/zui/components/Icons';
import { DropdownIconLabel } from '../ui/DropdownIconLabel/DropdownIconLabel';
import {
	Step,
	ToggleOptions,
	MediaType,
	DropdownItem,
} from '@zero-tech/zui/components';

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

export const VOTING_PROCESS_OPTIONS: ToggleOptions = [
	{
		key: 'absolute',
		label: 'ABSOLUTE',
	},
	{
		key: 'majority',
		label: 'MAJORITY',
	},
];

export const getVotingPeriodItems = (setFieldValue: any): DropdownItem[] => {
	return [...Array(7)].map((_, i) => {
		const day = i + 1;
		const dayString = i === 0 ? '1 Day' : `${day} Days`;

		return {
			id: day.toString(),
			label: dayString,
			onSelect: () => setFieldValue('votingPeriod', dayString),
		};
	});
};

export const getVotingSystemItems = (
	setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
): DropdownItem[] => [
	{
		id: 'snapshot',
		label: <DropdownIconLabel icon={<IconLightning2 />} label="Snapshot" />,
		onSelect: () => setFieldValue('votingSystem', 'Snapshot'),
	},
	{
		id: 'polygon',
		label: 'Polygon',
		onSelect: () => setFieldValue('votingSystem', 'Polygon'),
	},
	{
		id: 'starkware',
		label: 'Starkware (coming soon)',
		onSelect: () => setFieldValue('votingSystem', 'Starkware'),
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
