import { MoreOptions, Option } from '../MoreNFTOptions.types';
import { OptionType } from '../MoreNFTOptions.constants';

import { IconSend } from '../Icons';
import { OptionLabel } from '../OptionLabel';

type UseMoreOptionsReturn = {
	moreOptions: MoreOptions[];
};

/**
 * Returns list of actions, i.e. "transfer", "create token".
 */
export const useMoreOptions = (
	setOption: (option: Option) => void,
): UseMoreOptionsReturn => {
	/* More options list - add additional options here */
	const moreOptions = [
		{
			id: OptionType.TRANSFER,
			label: <OptionLabel icon={<IconSend />} label="Transfer Ownership" />,
			onSelect: () => setOption(OptionType.TRANSFER),
		},
	];

	return {
		moreOptions,
	};
};
