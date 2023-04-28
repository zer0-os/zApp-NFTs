import { getHashFromIPFSUrl } from '../util';

export enum NFT_ASSET_SHARE_KEYS {
	TWITTER = 'TWITTER',
}

export const NFT_ASSET_SHARE_OPTIONS = {
	[NFT_ASSET_SHARE_KEYS.TWITTER]: {
		URL: 'https://twitter.com/share?url=NFT_ASSET_DOMAIN_URL',
		OPTIONS:
			'menubar=no,toolbar=no,resizable=no,scrollbars=no,personalbar=no,height=575,width=500',
	},
};

export enum NFT_ASSET_URLS {
	VIDEO = 'https://res.cloudinary.com/fact0ry/video/upload/c_fit,h_900,w_900,fps_1-24,f_mp4,vc_h264,ac_aac/v1631501273/zns/NFT_ASSET_HASH.mp4',
	IMAGE = 'https://res.cloudinary.com/fact0ry/image/upload/c_fit,h_1900,w_1200,q_auto/v1631501273/zns/NFT_ASSET_HASH.jpg',
}

/**
 * Assigns domain url and opens external share window
 * @param zna - current domain zna
 * @param key - share key i.e. twitter key
 * @returns
 */
export const shareDomainAsset = (
	zna: string,
	key: NFT_ASSET_SHARE_KEYS = NFT_ASSET_SHARE_KEYS.TWITTER,
): void => {
	const domainUrl = encodeURIComponent(
		`${process.env.REACT_APP_ZNS_SHARE_BASE_URL}/${zna}/nfts`,
	);

	window.open(
		NFT_ASSET_SHARE_OPTIONS[key].URL.replace(
			/NFT_ASSET_DOMAIN_URL/g,
			domainUrl,
		),
		'',
		NFT_ASSET_SHARE_OPTIONS[key].OPTIONS,
	);
};

/**
 * Gets domain asset URL for downloading
 * @param url input - this will be an IPFS link
 * @returns
 */
export const getDomainAsset = async (
	url: string,
): Promise<string | undefined> => {
	const hash = getHashFromIPFSUrl(url);

	const checkUrl = (url: string) => {
		return new Promise((resolve, reject) => {
			fetch(url, { method: 'HEAD' }).then((r) => {
				if (r.ok) {
					resolve(url);
				} else {
					reject();
				}
			});
		});
	};

	try {
		const asset = await Promise.any([
			checkUrl(NFT_ASSET_URLS.VIDEO.replace(/NFT_ASSET_HASH/g, hash)),
			checkUrl(NFT_ASSET_URLS.IMAGE.replace(/NFT_ASSET_HASH/g, hash)),
		]);

		if (typeof asset !== 'string') {
			return;
		}

		return asset;
	} catch (e) {
		console.error(e);
	}
};

/**
 * Downloads the given asset
 * @param asset this will be the asset returned from getDomainAsset
 * @returns
 */
export const downloadDomainAsset = async (asset: string): Promise<void> => {
	try {
		const response = await fetch(asset, { method: 'GET' });

		if (!response.ok) {
			throw new Error(`Error fetching asset: ${response.statusText}`);
		}

		const buffer = await response.arrayBuffer();
		const url = window.URL.createObjectURL(new Blob([buffer]));
		const link = document.createElement('a');
		link.href = url;

		const fileName = asset.split('/').pop() || 'downloaded-asset';
		link.setAttribute('download', fileName);

		document.body.appendChild(link);
		link.click();
		link.remove();
	} catch (e: any) {
		console.error(`Error downloading asset: ${e.message}`);
	}
};
