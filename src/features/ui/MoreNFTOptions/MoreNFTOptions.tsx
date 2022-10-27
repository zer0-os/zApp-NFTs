import { FC, useState } from 'react';

import { OptionLabel } from '../OptionLabel';
import { TransferOwnershipModal } from '../../transfer-ownership';
import { DropdownMenu, DropdownMenuProps } from '@zero-tech/zui/components';
import { IconSend3 } from '@zero-tech/zui/components/Icons';

export const enum OptionType {
	TRANSFER = 'transfer',
}

export type Option = 'transfer';

type MoreNFTOptionsProps = {
	zna: string;
	trigger: DropdownMenuProps['trigger'];
};

/**
 * Wraps the shared functionality of additional NFT options.
 */
export const MoreNFTOptions: FC<MoreNFTOptionsProps> = ({ zna, trigger }) => {
	const [option, setOption] = useState<Option | undefined>();

	const onChange = (open: boolean) => {
		if (!open) {
			setOption(undefined);
		}
	};

	const onClose = () => setOption(undefined);

	const moreOptions = [
		{
			id: OptionType.TRANSFER,
			label: (
				<OptionLabel icon={<IconSend3 isFilled />} label="Transfer Ownership" />
			),
			onSelect: () => setOption(OptionType.TRANSFER),
		},
	];

	/* Returns drop down menu including modals for each option - add additional modals here  */
	return (
		<>
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
