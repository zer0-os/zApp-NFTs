import { MediaType } from '@zero-tech/zui/src/components/MediaInput';

export interface DetailsFormSubmit {
	mediaType: MediaType | undefined;
	previewUrl: string;
	avatar?: Buffer;
	name: string;
	symbol: string;
}

export interface TokenomicsFormSubmit {
	tokenCount: string;
	initialWalletAddress: string;
	adminWalletAddress: string;
}