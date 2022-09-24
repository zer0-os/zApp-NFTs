//- React Imports
import React, { FC } from 'react';

//- Component Imports
import { DetailsForm } from './DetailsForm/DetailsForm';
import { TokenomicsForm } from './TokenomicsForm/TokenomicsForm';
import { TokenSummary } from './TokenSummary/TokenSummary';

//- Type Imports
import { DetailsFormSubmit, TokenomicsFormSubmit } from '../CreateToken.types';
import { MediaType } from '@zero-tech/zui/src/components/MediaInput';

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
					initialWalletAddress={tokenomicsFormValues.initialWalletAddress}
					adminAddress={tokenomicsFormValues.adminWalletAddress}
					onMediaInputChange={onMediaInputChange}
					onSubmit={onLaunchSubmit}
					onClose={onClose}
				/>
			);
	}
};
