import { Maybe } from '@zero-tech/zns-sdk';

const tokenToUsdCache: { [token: string]: number | undefined } = {};

export const tokenToUsd = async (token: string): Promise<number> => {
	if (tokenToUsdCache[token]) {
		return tokenToUsdCache[token]!;
	}

	let priceInUsd: Maybe<number>;

	const res = await fetch(
		`https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`,
	);

	const data = await res.json();

	if (!data[token]) {
		throw Error(`Unable to fetch price for ${token}`);
	}

	priceInUsd = data[token].usd as number;

	tokenToUsdCache[token] = priceInUsd;

	return priceInUsd;
};

// Token Price
export const wildTokenPrice = async () => {
	return await tokenToUsd('wilder-world');
};

export const ethTokenPrice = async () => {
	return await tokenToUsd('ethereum');
};

export const zeroTokenPrice = async () => {
	return await tokenToUsd('zero-tech');
};
