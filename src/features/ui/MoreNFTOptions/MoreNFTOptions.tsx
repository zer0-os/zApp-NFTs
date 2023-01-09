import { FC, useCallback, ReactNode, useState } from 'react';

import { OptionLabel } from '../OptionLabel';
import { DomainSettingsModal } from '../../domain-settings';
import { CreateTokenModal } from '../../create-token';
import { TransferOwnershipModal } from '../../transfer-ownership';
import { DropdownMenu } from '@zero-tech/zui/components';
import {
	IconSend3,
	IconCube1,
	IconDatabase2,
} from '@zero-tech/zui/components/Icons';

export const enum OptionType {
	TRANSFER = 'transfer',
	DOMAIN_SETTINGS = 'domain-settings',
	CREATE_TOKEN = 'create-token',
}

export type Option = 'transfer' | 'domain-settings' | 'create-token';

type MoreNFTOptionsProps = {
	zna: string;
	trigger: ReactNode;
};

// TODO: add option label to zUI
const transferOptionLabel = (
	<OptionLabel icon={<IconSend3 isFilled />} label="Transfer Ownership" />
);

const domainSettingsOptionLabel = (
	<OptionLabel icon={<IconCube1 isFilled />} label="My Domain Settings" />
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
			className: 'domain-settings',
			id: OptionType.DOMAIN_SETTINGS,
			label: domainSettingsOptionLabel,
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

			<DomainSettingsModal
				zna={zna}
				open={option === OptionType.DOMAIN_SETTINGS}
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
