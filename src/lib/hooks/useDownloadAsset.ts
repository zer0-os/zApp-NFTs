import { useCallback } from 'react';

import { downloadDomainAsset, getDomainAsset } from '../../lib/helpers';

interface useDownloadAssetReturn {
	downloadAsset: (assetUrl: string) => Promise<void>;
}

export const useDownloadAsset = (): useDownloadAssetReturn => {
	const downloadAsset = useCallback(async (assetUrl: string) => {
		const asset = await getDomainAsset(assetUrl);

		if (asset) {
			try {
				await downloadDomainAsset(asset);
			} catch (e) {
				console.error(e);
			}
		}
	}, []);

	return {
		downloadAsset,
	};
};
