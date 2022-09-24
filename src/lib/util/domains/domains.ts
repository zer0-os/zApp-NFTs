import { ethers } from 'ethers';

export const rootDomainId = ethers.constants.HashZero;

const getSubnodeHash = (parentHash: string, labelHash: string): string =>
	ethers.utils.keccak256(
		ethers.utils.defaultAbiCoder.encode(
			['bytes32', 'bytes32'],
			[ethers.utils.arrayify(parentHash), ethers.utils.arrayify(labelHash)],
		),
	);

export const getDomainId = (name: string) => {
	let hashReturn = rootDomainId;

	if (name === '') {
		return hashReturn;
	}

	const domains = name.split('.');
	for (let i = 0; i < domains?.length; i++) {
		hashReturn = getSubnodeHash(hashReturn, ethers.utils.id(domains[i]));
	}
	return hashReturn;
};

export const truncateAddress = (
	address: string,
	startingCharacters?: number,
) => {
	return `${address.substring(
		0,
		2 + (startingCharacters ?? 0),
	)}...${address.substring(address.length - 4)}`;
};
