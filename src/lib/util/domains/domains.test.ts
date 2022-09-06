//- Utils Imports
import { getDomainId, truncateAddress } from './domains';

//- Mocks Imports
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

//////////////////////////
// f:: truncateAddress  //
//////////////////////////

describe('truncateAddress', () => {
	describe('when no startingCharacters are passed in', () => {
		it('should truncate using the first two and last four characters', () => {
			expect(truncateAddress(wilderDomainId)).toBe('0x...bb3b');
		});
	});

	describe('when startingCharacters are passed in', () => {
		it('should truncate using the first two, plus startingCharacters value and last four characters', () => {
			expect(truncateAddress(wilderDomainId, 4)).toBe('0x196c...bb3b');
			expect(truncateAddress(wilderDomainId, 3)).toBe('0x196...bb3b');
			expect(truncateAddress(wilderDomainId, 2)).toBe('0x19...bb3b');
			expect(truncateAddress(wilderDomainId, 1)).toBe('0x1...bb3b');
		});
	});
});
