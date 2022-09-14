import { isValidEthAddress } from '../../lib/util/address/address';

export const isValid = (value: string, account: string) =>
	isValidEthAddress(value) && !(value.toLowerCase() === account.toLowerCase());

export const handleInputError = (value: string, account: string) =>
	isValidEthAddress(value) && value.toLowerCase() === account.toLowerCase()
		? 'The address entered already owns this domain'
		: 'Please enter a valid Ethereum wallet address';
