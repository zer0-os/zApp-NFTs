import { useCallback } from 'react';

import { NFT_ASSET_SHARE_KEYS, shareDomainAsset } from '../../helpers';

interface useShareAssetReturn {
	shareAsset: (key: NFT_ASSET_SHARE_KEYS) => Promise<void>;
}

export const useShareAsset = (zna: string): useShareAssetReturn => {
	const shareAsset = useCallback(
		async (key: NFT_ASSET_SHARE_KEYS) => {
			if (zna) {
				shareDomainAsset(zna, key);
			}
		},
		[zna],
	);

	return {
		shareAsset,
	};
};
