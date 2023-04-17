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
