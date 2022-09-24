import { getHashFromIPFSUrl } from './ipfs';

import { HASH } from './mocks';

////////////////////////////
// f:: getHashFromIPFSUrl //
////////////////////////////

const nesting = [...Array(10)]
	.map(() => (Math.random() + 1).toString(36).substring(7))
	.join('/');

describe('getHashFromIPFSUrl', () => {
	it('should handle ipfs:// URLs', () => {
		expect(getHashFromIPFSUrl('ipfs://' + HASH)).toBe(HASH);
	});

	it('should handle arbitrary web URLs', () => {
		expect(getHashFromIPFSUrl('https://ipfs.fleek.co/ipfs/' + HASH)).toBe(HASH);
		expect(getHashFromIPFSUrl('https://ipfs.io/ipfs/' + HASH)).toBe(HASH);
		expect(getHashFromIPFSUrl('test.com/' + HASH)).toBe(HASH);
		expect(getHashFromIPFSUrl('192.168.1.1/' + HASH)).toBe(HASH);
	});

	it('should handle deeply nested URLs', () => {
		const url = `https://test.com/${nesting}/${HASH}`;
		expect(getHashFromIPFSUrl(url)).toBe(HASH);
	});

	it('should handle URLs with no IPFS hash', () => {
		expect(getHashFromIPFSUrl('https://ipfs.fleek.co/')).toBe(undefined);
	});

	it('should handle nested IPFS content', () => {
		const WEB_URL = `https://test.com/`;
		expect(getHashFromIPFSUrl(`${WEB_URL}/${HASH}/${nesting}`)).toBe(
			`${HASH}/${nesting}`,
		);
		expect(getHashFromIPFSUrl(`${`${WEB_URL}/${HASH}/4`}`)).toBe(`${HASH}/4`);
	});

	it('should handle URLs containing Qm', () => {
		expect(getHashFromIPFSUrl('test.com/Qm/' + HASH)).toBe(HASH);
		expect(getHashFromIPFSUrl('Qm.com/' + HASH)).toBe(HASH);
		expect(getHashFromIPFSUrl('test.com/' + HASH + '/Qm')).toBe(HASH + '/Qm');
		expect(getHashFromIPFSUrl('ipfs.com/Qmg/' + HASH + '/test')).toBe(
			HASH + '/test',
		);
	});

	// CIDv0 is CID which has 46 characters starting with "Qm"
	// More info - https://docs.ipfs.io/concepts/content-addressing/#cid-conversion
	it('should handle URLs containing Qm but invalid CIDv0 length', () => {
		const invalidCID = HASH.slice(0, 42);
		expect(getHashFromIPFSUrl('test.com/Qm/' + invalidCID)).toBe(undefined);
		expect(getHashFromIPFSUrl('Qm.com/' + invalidCID)).toBe(undefined);
		expect(getHashFromIPFSUrl('test.com/' + invalidCID + '/Qm')).toBe(
			undefined,
		);
		expect(getHashFromIPFSUrl('ipfs.com/Qmg/' + invalidCID + '/test')).toBe(
			undefined,
		);
	});
});
