import {
	chainIdToNetworkType,
	getEtherscanUri,
} from '../../../lib/helpers/network';
import { Network } from '../../../lib/constants/networks';

import { BigNumber, ethers } from 'ethers';
import { Domain } from '@zero-tech/zns-sdk';

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

export const getParentZna = (childZna: string) => {
	const domains = childZna.split('.');
	domains.pop();
	return domains.join('.');
};

export const truncateAddress = (
	address: string,
	startingCharacters?: number,
) => {
	return `${address?.substring(
		0,
		2 + (startingCharacters ?? 0),
	)}...${address?.substring(address.length - 4)}`;
};

export const getEtherscanLink = (domain: Domain, chainId: Network) => {
	const domainIdInteger = domain && BigNumber.from(domain.id);
	const networkType = chainIdToNetworkType(chainId);
	const etherscanBaseUri = getEtherscanUri(networkType);
	const registrarAddress = domain ? domain.contract : '';

	return `${etherscanBaseUri}token/${registrarAddress}?a=${domainIdInteger?.toString()}`;
};
