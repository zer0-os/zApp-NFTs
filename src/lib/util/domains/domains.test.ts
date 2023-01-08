import { getDomainId } from './domains';

import { rootDomainId, wilderDomainId } from './mocks';

//////////////////////
// f:: getDomainId  //
//////////////////////

describe('getDomainId', () => {
	describe('when args is equal to empty string', () => {
		it('should return the rootDomainId (hashZero)', () => {
			expect(getDomainId('')).toBe(rootDomainId);
		});
	});

	describe('when args is a valid string', () => {
		it('should convert to and return a subnode hash (domainId)', () => {
			expect(getDomainId('wilder')).toBe(wilderDomainId);
		});
	});
});
