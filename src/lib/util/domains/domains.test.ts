//- Utils Imports
import { getDomainId } from './domains';

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

	describe('when args is equal to undefined', () => {
		it('should return the rootDomainId (hashZero)', () => {
			expect(getDomainId(undefined)).toBe(rootDomainId);
		});
	});

	describe('when args is equal to null', () => {
		it('should return the rootDomainId (hashZero)', () => {
			expect(getDomainId(null)).toBe(rootDomainId);
		});
	});

	describe('when args is a valid string', () => {
		it('should convert to and return a subnode hash (domainId)', () => {
			expect(getDomainId('wilder')).toBe(wilderDomainId);
		});
	});
});
