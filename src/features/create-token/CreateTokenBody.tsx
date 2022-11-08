import { FC } from 'react';

import { MediaType } from '@zero-tech/zui/components/MediaInput';
import { DetailsForm, TokenomicsForm, TokenSummary } from './steps';
import { DetailsFormSubmit, TokenomicsFormSubmit } from './CreateToken.types';

type CreateTokenBodyProps = {
	stepId: string;
	detailsFormValues: DetailsFormSubmit;
	onDetailsSubmit: (values: DetailsFormSubmit) => void;
	tokenomicsFormValues: TokenomicsFormSubmit;
	onTokenomicsSubmit: (values: TokenomicsFormSubmit) => void;
	onMediaInputChange: (
		mediaType: MediaType,
		previewUrl: string,
		image: Buffer,
	) => void;
	onLaunchSubmit: () => void;
	onClose: () => void;
};

export const CreateTokenBody: FC<CreateTokenBodyProps> = ({
	stepId,
	detailsFormValues,
	onDetailsSubmit,
	tokenomicsFormValues,
	onTokenomicsSubmit,
	onMediaInputChange,
	onLaunchSubmit,
	onClose,
}) => {
	switch (stepId) {
		case 'details':
			return (
				<DetailsForm
					values={detailsFormValues}
					onSubmit={onDetailsSubmit}
					onClose={onClose}
				/>
			);
		case 'tokenomics':
			return (
				<TokenomicsForm
					values={tokenomicsFormValues}
					onSubmit={onTokenomicsSubmit}
					onClose={onClose}
				/>
			);
		case 'launch':
			return (
				<TokenSummary
					mediaType={detailsFormValues.mediaType}
					previewUrl={detailsFormValues.previewUrl}
					tokenName={detailsFormValues.name}
					symbol={detailsFormValues.symbol}
					totalSupply={tokenomicsFormValues.tokenCount}
					initialTokenSupplyWalletAddress={
						tokenomicsFormValues.initialTokenSupplyWalletAddress
					}
					adminAddress={tokenomicsFormValues.adminWalletAddress}
					onMediaInputChange={onMediaInputChange}
					onSubmit={onLaunchSubmit}
					onClose={onClose}
				/>
			);
	}
};
