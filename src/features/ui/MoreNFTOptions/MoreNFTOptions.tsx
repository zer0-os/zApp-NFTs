import { FC, useCallback, ReactNode, useState } from 'react';

import { OptionLabel } from '../OptionLabel';
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
} from '@zero-tech/zui/components/Icons';

export const enum OptionType {
	CREATE_TOKEN = 'create-token',
	DOMAIN_SETTINGS = 'domain-settings',
	SET_BUY_NOW = 'set-buy-now',
	TRANSFER = 'transfer',
}

export type Option =
	| 'create-token'
	| 'domain-settings'
	| 'set-buy-now'
	| 'transfer';

type MoreNFTOptionsProps = {
	zna: string;
	trigger: ReactNode;
};

// TODO: add option label to zUI
const createTokenOptionLabel = (
	<OptionLabel icon={<IconDatabase2 isFilled />} label="Create Token" />
);

const domainSettingsOptionLabel = (
	<OptionLabel icon={<IconCube1 isFilled />} label="My Domain Settings" />
);

const setBuyNowOptionLabel = (
	<OptionLabel icon={<IconTag1 isFilled />} label="Set Buy Now" />
);

const transferOptionLabel = (
	<OptionLabel icon={<IconSend3 isFilled />} label="Transfer Ownership" />
);

/**
 * Wraps the shared functionality of additional NFT options.
 */
export const MoreNFTOptions: FC<MoreNFTOptionsProps> = ({ zna, trigger }) => {
	const [option, setOption] = useState<Option | undefined>();

	const moreOptions = [
		{
			className: 'create-token',
			id: OptionType.CREATE_TOKEN,
			label: createTokenOptionLabel,
			onSelect: (e: any) => onSelectOption(e),
		},
		{
			className: 'domain-settings',
			id: OptionType.DOMAIN_SETTINGS,
			label: domainSettingsOptionLabel,
			onSelect: (e: any) => onSelectOption(e),
		},
		{
			className: 'set-buy-now',
			id: OptionType.SET_BUY_NOW,
			label: setBuyNowOptionLabel,
			onSelect: (e: any) => onSelectOption(e),
		},
		{
			className: 'transfer',
			id: OptionType.TRANSFER,
			label: transferOptionLabel,
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

			<DropdownMenu
				items={moreOptions}
				side="bottom"
				alignMenu="end"
				trigger={trigger}
			/>
		</>
	);
};
