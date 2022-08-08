//- Utils Imports
import { getDomainId } from './domains';

//- Library Imports
import { ethers } from 'ethers';

const rootDomainId = ethers.constants.HashZero;
const wilderDomainId =
	'0x196c0a1e30004b9998c97b363e44f1f4e97497e59d52ad151208e9393d70bb3b';

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
		it('should convert to and return a subnode hash', () => {
			expect(getDomainId('wilder')).toBe(wilderDomainId);
		});
	});
});
