import { ethers } from 'ethers';

export const isValidTransferAddress = (
	value: string,
	account: string,
	owner: string,
) =>
	ethers.utils.isAddress(value) &&
	!(value?.toLowerCase() === account?.toLowerCase()) &&
	account?.toLowerCase() === owner?.toLowerCase();

export const getInputErrorMessage = (
	value: string,
	account: string,
	owner: string,
) => {
	if (account?.toLowerCase() !== owner?.toLowerCase()) {
		return 'You are not the owner of this domain';
	} else {
		return value?.toLowerCase() === account?.toLowerCase()
			? 'The address entered already owns this domain'
			: 'Please enter a valid Ethereum wallet address';
	}
};
