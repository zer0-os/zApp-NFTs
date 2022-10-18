import { MoreOptions, Option } from '../MoreNFTOptions.types';
import { OptionType } from '../MoreNFTOptions.constants';

import { OptionLabel } from '../OptionLabel';
import { IconSend3 } from '@zero-tech/zui/components/Icons';

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
			label: (
				<OptionLabel icon={<IconSend3 isFilled />} label="Transfer Ownership" />
			),
			onSelect: () => setOption(OptionType.TRANSFER),
		},
	];

	return {
		moreOptions,
	};
};
