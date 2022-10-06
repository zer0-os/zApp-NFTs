import { MediaType } from '@zero-tech/zui/components/MediaInput';

export interface DetailsFormSubmit {
	mediaType: MediaType | undefined;
	previewUrl: string;
	avatar?: Buffer;
	name: string;
	symbol: string;
}

export interface TokenomicsFormSubmit {
	tokenCount: string;
	initialTokenSupplyWalletAddress: string;
	adminWalletAddress: string;
}
