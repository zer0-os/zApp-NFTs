import { ethers } from 'ethers';
import {
	ClaimWithChildInstance,
	GenSaleData,
	GenSaleInstance,
	GenSaleStatus,
	SaleStatus,
} from '@zero-tech/zsale-sdk';

import { Stage, DropData } from './types';

const TEST_MODE = false;
const TEST_STATE: SaleStatus = SaleStatus.PrivateSale;
const IS_ON_WHITELIST = true;

const TEST: { [status in GenSaleStatus]: GenSaleData } = {
	[GenSaleStatus.NotStarted]: {
		amountSold: 0,
		amountForSale: 50,
		salePrice: '0.007',
		started: false,
		paused: false,
		startBlock: 10488021,
		limitPerTransaction: 10,
		saleStatus: GenSaleStatus.NotStarted,
	},
	[GenSaleStatus.ClaimSale]: {
		amountSold: 10,
		amountForSale: 50,
		salePrice: '0.007',
		started: true,
		paused: false,
		startBlock: 10488021,
		limitPerTransaction: 10,
		saleStatus: GenSaleStatus.ClaimSale,
	},
	[GenSaleStatus.PrivateSale]: {
		amountSold: 40,
		amountForSale: 50,
		salePrice: '0.007',
		started: true,
		paused: false,
		startBlock: 10488021,
		limitPerTransaction: 10,
		saleStatus: GenSaleStatus.PrivateSale,
	},
	[GenSaleStatus.Ended]: {
		amountSold: 50,
		amountForSale: 50,
		salePrice: '0.007',
		started: true,
		paused: true,
		startBlock: 10488021,
		limitPerTransaction: 10,
		saleStatus: GenSaleStatus.Ended,
	},
};

export const getDropData = (
	zSaleInstance: GenSaleInstance,
): Promise<DropData | undefined> => {
	return new Promise(async (resolve, reject) => {
		try {
			const [dropStage, saleData] = await Promise.all([
				getDropStage(zSaleInstance),
				getSaleQuantites(zSaleInstance),
			]);

			// Check if we somehow got an undefined variable
			if (
				dropStage === undefined ||
				saleData === undefined ||
				saleData.amountForSale === undefined ||
				saleData.amountSold === undefined
			) {
				throw Error('Failed to retrieve primary data');
			}
			resolve({
				dropStage,
				wheelsTotal: saleData.amountForSale,
				wheelsMinted: saleData.amountSold,
			});
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const getDropStage = async (
	zSaleInstance: ClaimWithChildInstance | GenSaleInstance,
): Promise<Stage | undefined> => {
	let status, data;

	if (TEST_MODE) {
		await new Promise((r) => setTimeout(r, 2000));
		status = TEST_STATE;
		data = TEST[TEST_STATE];
	} else {
		status = await zSaleInstance.getSaleStatus();
		data = await zSaleInstance.getSaleData();
	}
	if ((status as unknown) === GenSaleStatus.NotStarted) {
		return Stage.Upcoming;
	}
	if (data.amountSold === data.amountForSale) {
		return Stage.Sold;
	}
	// Added for matching with the old sale status
	if ((status as unknown) === GenSaleStatus.ClaimSale) {
		return Stage.Whitelist;
	}

	if ((status as unknown) === GenSaleStatus.Ended) {
		return Stage.Ended;
	}
	if ((status as unknown) === GenSaleStatus.PrivateSale) {
		return Stage.Public;
	}
};

export const getNumberPurchasedByUser = async (
	zSaleInstance: GenSaleInstance,
	account: string,
) => {
	return await zSaleInstance.getDomainsPurchasedByAccount(account);
};

export const getMaxPurchasesPerUser = async (
	zSaleInstance: GenSaleInstance,
	account: string,
) => {
	return await zSaleInstance.numberPurchasableByAccount(account);
};

export const getUserEligibility = async (
	account: string,
	zSaleInstance: GenSaleInstance,
): Promise<boolean | undefined> => {
	if (TEST_MODE) {
		return IS_ON_WHITELIST;
	} else {
		return await zSaleInstance.isUserOnMintlist(account);
	}
};

const getSaleQuantites = async (
	zSaleInstance: GenSaleInstance,
): Promise<GenSaleData | undefined> => {
	if (TEST_MODE) {
		await new Promise((r) => setTimeout(r, 2000));
		return TEST[TEST_STATE];
	} else {
		return await zSaleInstance.getSaleData();
	}
};

export const getBalanceEth = async (
	signer: ethers.Signer,
): Promise<number | undefined> => {
	const ethBalance = await signer?.getBalance();
	const asString = ethers.utils.formatEther(ethBalance);
	return Number(asString);
};
