import { FC, useCallback, ReactNode, useState } from 'react';

import { OptionLabel } from '../OptionLabel';
import { ViewBidsModal } from '../../view-bids';
import { SetBuyNowModal } from '../../set-buy-now';
import { CreateTokenModal } from '../../create-token';
import { DomainSettingsModal } from '../../domain-settings';
import { TransferOwnershipModal } from '../../transfer-ownership';
import { DropdownMenu } from '@zero-tech/zui/components';

import {
	IconTag1,
	IconSend3,
	IconCube1,
	IconDatabase2,
	IconCurrencyDollar,
} from '@zero-tech/zui/components/Icons';

export const enum OptionType {
	CREATE_TOKEN = 'create-token',
	DOMAIN_SETTINGS = 'domain-settings',
	SET_BUY_NOW = 'set-buy-now',
	TRANSFER = 'transfer',
	VIEW_BIDS = 'view-bids',
}

export type Option =
	| 'create-token'
	| 'domain-settings'
	| 'set-buy-now'
	| 'transfer'
	| 'view-bids';

type MoreNFTOptionsProps = {
	zna: string;
	trigger: ReactNode;
};

/**
 * Wraps the shared functionality of additional NFT options.
 */
export const MoreNFTOptions: FC<MoreNFTOptionsProps> = ({ zna, trigger }) => {
	const [option, setOption] = useState<Option | undefined>();

	const moreOptions = [
		{
			className: 'view-bids',
			id: OptionType.VIEW_BIDS,
			label: (
				<OptionLabel
					label={'View Bids'}
					icon={<IconCurrencyDollar isFilled />}
				/>
			),
			onSelect: (e: any) => onSelectOption(e),
		},
		{
			className: 'create-token',
			id: OptionType.CREATE_TOKEN,
			label: (
				<OptionLabel label={'Create Token'} icon={<IconDatabase2 isFilled />} />
			),
			onSelect: (e: any) => onSelectOption(e),
		},
		{
			className: 'domain-settings',
			id: OptionType.DOMAIN_SETTINGS,
			label: (
				<OptionLabel
					label={'My Domain Settings'}
					icon={<IconCube1 isFilled />}
				/>
			),
			onSelect: (e: any) => onSelectOption(e),
		},
		{
			className: 'set-buy-now',
			id: OptionType.SET_BUY_NOW,
			label: <OptionLabel label={'Set Buy Now'} icon={<IconTag1 isFilled />} />,
			onSelect: (e: any) => onSelectOption(e),
		},
		{
			className: 'transfer',
			id: OptionType.TRANSFER,
			label: (
				<OptionLabel
					label={'Transfer Ownership'}
					icon={<IconSend3 isFilled />}
				/>
			),
			onSelect: (e: any) => onSelectOption(e),
		},
	];

	const onChange = (open: boolean) => {
		if (!open) {
			setOption(undefined);
		}
	};

	const onClose = () => setOption(undefined);

	const onSelectOption = useCallback(
		(e: any) =>
			setOption(
				moreOptions.find(
					(option) =>
						e?.target?.className === `zui-dropdown-item ${option.className}`,
				).id,
			),
		[moreOptions, setOption],
	);

	/* Returns drop down menu including modals for each option - add additional modals here  */
	return (
		<>
			<CreateTokenModal
				zna={zna}
				open={option === OptionType.CREATE_TOKEN}
				onOpenChange={onChange}
				onClose={onClose}
			/>

			<DomainSettingsModal
				zna={zna}
				open={option === OptionType.DOMAIN_SETTINGS}
				onOpenChange={onChange}
				onClose={onClose}
			/>

			<SetBuyNowModal
				zna={zna}
				open={option === OptionType.SET_BUY_NOW}
				onOpenChange={onChange}
			/>

			<TransferOwnershipModal
				zna={zna}
				open={option === OptionType.TRANSFER}
				onOpenChange={onChange}
				onClose={onClose}
			/>

			<ViewBidsModal
				zna={zna}
				open={option === OptionType.VIEW_BIDS}
				onOpenChange={onChange}
			/>

			<DropdownMenu
				items={moreOptions}
				side="bottom"
				alignMenu="end"
				trigger={trigger}
			/>
		</>
	);
};
