import { ethers } from 'ethers';

export const formatNumber = (number: number | string) => {
	return Number(number).toLocaleString();
};

export const formatEthers = (number: string) => {
	const asNumber = Number(ethers.utils.formatEther(number));
	return formatNumber(asNumber);
};
