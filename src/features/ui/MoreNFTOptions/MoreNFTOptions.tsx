import { FC, useCallback, ReactNode, useState } from 'react';

import { OptionLabel } from '../OptionLabel';
import { TransferOwnershipModal } from '../../transfer-ownership';
import { DropdownMenu } from '@zero-tech/zui/components';
import { IconSend3 } from '@zero-tech/zui/components/Icons';

export const enum OptionType {
	TRANSFER = 'transfer',
	DAO = 'dao',
}

export type Option = 'transfer' | 'dao';

type MoreNFTOptionsProps = {
	zna: string;
	trigger: ReactNode;
};

// TODO: add option label to zUI
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
