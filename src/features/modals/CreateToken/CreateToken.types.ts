export interface DetailsFormSubmit {
	avatar?: Buffer;
	name: string;
	symbol: string;
}

export interface TokenomicsFormSubmit {
	tokenCount: number;
	initialWalletAddress: string;
	adminWalletAddress: string;
}
