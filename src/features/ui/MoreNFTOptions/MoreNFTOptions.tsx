import { FC, useState } from 'react';

import { Option } from './MoreNFTOptions.types';
import { OptionType } from './MoreNFTOptions.constants';

import { TransferOwnershipModal } from '../../transfer-ownership';
import { DropdownMenu, DropdownMenuProps } from '@zero-tech/zui/components';
import { useMoreOptions } from './hooks/useMoreOptions';

type MoreNFTOptionsProps = {
	domainId: string;
	domainName: string;
	domainTitle: string;
	domainOwner: string;
	domainCreator: string;
	trigger: DropdownMenuProps['trigger'];
};

/**
 * Wraps the shared functionality of additional NFT options.
 */
export const MoreNFTOptions: FC<MoreNFTOptionsProps> = ({
	domainId,
	domainName,
	domainTitle,
	domainOwner,
	domainCreator,
	trigger,
}) => {
	const [option, setOption] = useState<Option | undefined>();

	/* Hook returning all options  */
	const { moreOptions } = useMoreOptions(setOption);

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
				domainName={domainName}
				domainTitle={domainTitle}
				domainOwner={domainOwner}
				domainCreator={domainCreator}
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
