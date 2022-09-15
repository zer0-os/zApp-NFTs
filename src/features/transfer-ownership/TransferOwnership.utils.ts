import { ethers } from 'ethers';

export const isValidTransferAddress = (value: string, account: string) =>
	ethers.utils.isAddress(value) &&
	!(value?.toLowerCase() === account?.toLowerCase());

export const getInputErrorMessage = (
	value: string,
	owner: string,
	account: string,
) =>
	account?.toLowerCase() !== owner?.toLowerCase()
		? 'You are not the owner'
		: ethers.utils.isAddress(value) &&
		  value?.toLowerCase() === account?.toLowerCase()
		? 'The address entered already owns this domain'
		: 'Please enter a valid Ethereum wallet address';
