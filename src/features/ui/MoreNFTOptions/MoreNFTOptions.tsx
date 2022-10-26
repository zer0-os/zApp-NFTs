import { FC, useState } from 'react';

import { Option } from './MoreNFTOptions.types';
import { OptionType } from './MoreNFTOptions.constants';

import { OptionLabel } from '../OptionLabel';
import { TransferOwnershipModal } from '../../transfer-ownership';
import { DropdownMenu, DropdownMenuProps } from '@zero-tech/zui/components';
import { IconSend3 } from '@zero-tech/zui/components/Icons';

type MoreNFTOptionsProps = {
	domainId: string;
	trigger: DropdownMenuProps['trigger'];
};

/**
 * Wraps the shared functionality of additional NFT options.
 */
export const MoreNFTOptions: FC<MoreNFTOptionsProps> = ({
	domainId,
	trigger,
}) => {
	const [option, setOption] = useState<Option | undefined>();

	const moreOptions = [
		{
			id: OptionType.TRANSFER,
			label: (
				<OptionLabel icon={<IconSend3 isFilled />} label="Transfer Ownership" />
			),
			onSelect: () => setOption(OptionType.TRANSFER),
		},
	];

	const onChange = (open: boolean) => {
		if (!open) {
			setOption(undefined);
		}
	};

	const onClose = () => setOption(undefined);

	/* Returns drop down menu including modals for each option - add additional modals here  */
	return (
		<>
			<TransferOwnershipModal
				open={option === OptionType.TRANSFER}
				domainId={domainId}
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
