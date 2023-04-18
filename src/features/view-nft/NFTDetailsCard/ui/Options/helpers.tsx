import { ReactNode } from 'react';

import { OptionLabel } from '../../../../ui';
import { ViewBidsModal } from '../../../../view-bids';
import { SetBuyNowModal } from '../../../../set-buy-now';
import { CreateTokenModal } from '../../../../create-token';
import { DomainSettingsModal } from '../../../../domain-settings';
import { TransferOwnershipModal } from '../../../../transfer-ownership';
import {
	IconCube1,
	IconCurrencyDollar,
	IconDatabase2,
	IconImage1,
	IconSend3,
	IconTag1,
	IconVideoRecorder,
} from '@zero-tech/zui/components/Icons';

export const enum DropdownOptionType {
	CREATE_TOKEN = 'create-token',
	DOMAIN_SETTINGS = 'domain-settings',
	SET_BUY_NOW = 'set-buy-now',
	TRANSFER = 'transfer',
	VIEW_BIDS = 'view-bids',
}

export type DropdownOption =
	| 'create-token'
	| 'domain-settings'
	| 'set-buy-now'
	| 'transfer'
	| 'view-bids';

/**
 * Gets the download options and filters by condition
 * @param imageUrl input - metadata image url
 * @param imageUrl2 input - metadata image_2 url
 * @param imageUrl3 input - metadata image_3 url
 * @param animationUrl input - metadata animation_url
 * @param downloadAsset input - uses useDownloadAsset hook return
 * @returns
 */
export const getDownloadOptions = (
	downloadAsset: (assetUrl: string) => Promise<void>,
	imageUrl?: string,
	imageUrl2?: string,
	imageUrl3?: string,
	animationUrl?: string,
) => {
	const args: GetUrlArgs = {
		imageUrl,
		imageUrl2,
		imageUrl3,
		animationUrl,
	};

	return downloadOptionConfig
		.filter(({ getUrl }) => getUrl(args))
		.map(({ id, label, icon, getUrl }) => ({
			id,
			label: <OptionLabel label={label} icon={icon} />,
			onSelect: () => downloadAsset(getUrl(args)),
		}));
};

interface GetUrlArgs {
	imageUrl?: string;
	imageUrl2?: string;
	imageUrl3?: string;
	animationUrl?: string;
}

const downloadOptionConfig = [
	{
		id: 'static',
		label: 'Static Image (PFP)',
		icon: <IconImage1 />,
		getUrl: ({ imageUrl }: GetUrlArgs) => imageUrl,
	},
	{
		id: 'static-2',
		label: 'Static Image 2 (PFP)',
		icon: <IconImage1 />,
		getUrl: ({ imageUrl2 }: GetUrlArgs) => imageUrl2,
	},
	{
		id: 'static-3',
		label: 'Static Image 3 (PFP)',
		icon: <IconImage1 />,
		getUrl: ({ imageUrl3 }: GetUrlArgs) => imageUrl3,
	},
	{
		id: 'full-animation',
		label: 'Full Animation',
		icon: <IconVideoRecorder />,
		getUrl: ({ animationUrl }: GetUrlArgs) => animationUrl,
	},
];

/**
 * Generates option for dropdown menu
 * @param id input - dropdown id's for modal type
 * @param label input - dropdown option label
 * @param icon input - icon element for option
 * @param onSelect input - targets dropdown id
 * @returns
 */
export const generateDropdownOption = (
	id: DropdownOptionType,
	label: string,
	icon: ReactNode,
	onSelect: (e: any) => void,
) => ({
	className: id,
	id,
	label: <OptionLabel label={label} icon={icon} />,
	onSelect: (e: any) => onSelect({ ...e, id }),
});

export const dropdownOptionConfig = [
	{
		id: DropdownOptionType.VIEW_BIDS,
		label: 'View Bids',
		icon: <IconCurrencyDollar isFilled />,
		modalComponent: ViewBidsModal,
	},
	{
		id: DropdownOptionType.CREATE_TOKEN,
		label: 'Create Token',
		icon: <IconDatabase2 isFilled />,
		modalComponent: CreateTokenModal,
	},
	{
		id: DropdownOptionType.DOMAIN_SETTINGS,
		label: 'My Domain Settings',
		icon: <IconCube1 isFilled />,
		modalComponent: DomainSettingsModal,
	},
	{
		id: DropdownOptionType.SET_BUY_NOW,
		label: 'Set Buy Now',
		icon: <IconTag1 isFilled />,
		modalComponent: SetBuyNowModal,
	},
	{
		id: DropdownOptionType.TRANSFER,
		label: 'Transfer Ownership',
		icon: <IconSend3 isFilled />,
		modalComponent: TransferOwnershipModal,
	},
];
