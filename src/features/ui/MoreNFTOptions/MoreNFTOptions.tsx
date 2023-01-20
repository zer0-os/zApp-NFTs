import { FC, useCallback, ReactNode, useState } from 'react';

import { OptionLabel } from '../OptionLabel';
import { SetBuyNowModal } from '../../set-buy-now';
import { CreateTokenModal } from '../../create-token';
import { TransferOwnershipModal } from '../../transfer-ownership';
import { DropdownMenu, DropdownMenuProps } from '@zero-tech/zui/components';
import {
	IconSend3,
	IconDatabase2,
	IconTag1,
} from '@zero-tech/zui/components/Icons';

export const enum OptionType {
	TRANSFER = 'transfer',
	SET_BUY_NOW = 'set-buy-now',
	CREATE_TOKEN = 'create-token',
}

export type Option = 'transfer' | 'set-buy-now' | 'create-token';

type MoreNFTOptionsProps = {
	zna: string;
	trigger: ReactNode;
};

// TODO: add option label to zUI
const transferOptionLabel = (
	<OptionLabel icon={<IconSend3 isFilled />} label="Transfer Ownership" />
);

const setBuyNowOptionLabel = (
	<OptionLabel icon={<IconTag1 isFilled />} label="Set Buy Now" />
);

const createTokenOptionLabel = (
	<OptionLabel icon={<IconDatabase2 isFilled />} label="Create Token" />
);

/**
 * Wraps the shared functionality of additional NFT options.
 */
export const MoreNFTOptions: FC<MoreNFTOptionsProps> = ({ zna, trigger }) => {
	const [option, setOption] = useState<Option | undefined>();

	const moreOptions = [
		{
			className: 'transfer',
			id: OptionType.TRANSFER,
			label: transferOptionLabel,
			onSelect: (e: any) => onSelectOption(e),
		},
		{
			className: 'set-buy-now',
			id: OptionType.SET_BUY_NOW,
			label: setBuyNowOptionLabel,
			onSelect: (e: any) => onSelectOption(e),
		},
		{
			className: 'create-token',
			id: OptionType.CREATE_TOKEN,
			label: createTokenOptionLabel,
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
			<TransferOwnershipModal
				zna={zna}
				open={option === OptionType.TRANSFER}
				onOpenChange={onChange}
				onClose={onClose}
			/>

			<SetBuyNowModal
				zna={zna}
				open={option === OptionType.SET_BUY_NOW}
				onOpenChange={onChange}
			/>

			<CreateTokenModal
				zna={zna}
				open={option === OptionType.CREATE_TOKEN}
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
