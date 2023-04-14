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

export const shareDomainAsset = (
	zna: string,
	key: NFT_ASSET_SHARE_KEYS = NFT_ASSET_SHARE_KEYS.TWITTER,
): void => {
	const domainUrl = encodeURIComponent(
		// TODO: update with env var
		`https://zns-share.herokuapp.com/${zna}`,
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
