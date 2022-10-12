import { FC, useState } from 'react';

import { useDataContainer } from '../../../lib/hooks/useDataContainer';

import { Option } from './MoreNFTOptions.types';
import { OptionType } from './MoreNFTOptions.constants';

import { TransferOwnershipModal } from '../../transfer-ownership';
import { DropdownMenu, DropdownMenuProps } from '@zero-tech/zui/components';
import { useMoreOptions } from './hooks/useMoreOptions';

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

	/* Hook returning all options  */
	const { moreOptions } = useMoreOptions(setOption);

	/* Hook returning data for  modals  */
	const { domain, domainMetadata } = useDataContainer(domainId);

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
				domainId={domain?.id}
				domainName={domain?.name}
				domainTitle={domainMetadata?.title}
				domainOwner={domain?.owner}
				domainCreator={domain?.minter}
				onClose={onClose}
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
