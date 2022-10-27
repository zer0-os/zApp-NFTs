import { DEFAULT_IPFS_GATEWAY } from '../../../lib/constants/ipfs';

/**
 * Pulls the IPFS hash from an IPFS url
 * @param url IPFS url to get hash from
 * @returns IPFS hash from url
 */
export const getHashFromIPFSUrl = (url: string) => {
	const regex = /Qm(\w{44})[/\w]*/;

	if (regex.test(url)) {
		const matches = url.match(regex) as string[];
		return matches[0];
	}

	return undefined;
};

/**
 * Converts the hash from IPFSUrl to a web url
 * @param hash Hash converted from IPFSUrl
 * @returns IPFS web url
 */
export const getWebIPFSUrlFromHash = (hash: string) => {
	return `${DEFAULT_IPFS_GATEWAY}${hash}`;
};
