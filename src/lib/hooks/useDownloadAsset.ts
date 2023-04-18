import { useCallback } from 'react';
import { downloadDomainAsset, getDomainAsset } from '../../lib/helpers';

interface UseDownloadAssetReturn {
	downloadAsset: (assetUrl: string) => Promise<void>;
}

export const useDownloadAsset = (): UseDownloadAssetReturn => {
	const downloadAsset = useCallback(async (assetUrl: string) => {
		try {
			const asset = await getDomainAsset(assetUrl);

			if (asset) {
				await downloadDomainAsset(asset);
			} else {
				console.error(`No asset found for URL: ${assetUrl}`);
			}
		} catch (e: any) {
			console.error(`Error downloading asset: ${e.message}`);
		}
	}, []);

	return {
		downloadAsset,
	};
};
