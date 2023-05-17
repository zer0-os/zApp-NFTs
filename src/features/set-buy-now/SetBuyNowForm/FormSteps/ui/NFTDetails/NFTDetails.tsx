import React, { FC } from 'react';

import { Step } from '../../hooks';
import { truncateAddress, truncateDomain } from '@zero-tech/zui/utils';

import {
	DetailsContentType,
	Media,
	ModalDetails,
	ModalDetailsContainer,
} from '../../../../..//ui';

// note: getting from useBuyNowData as a quick hack - should rewrite for this component
import { useBuyNowData } from '../../../../../buy-now/useBuyNowData';

export interface NFTDetailsProps {
	zna: string;
	step?: Step;
}

export const NFTDetails: FC<NFTDetailsProps> = ({ zna, step }) => {
	const {
		title,
		creator,
		imageAlt,
		imageSrc,
		isMediaAnimated,
		highestBidAsString,
		isLoading,
	} = useBuyNowData(zna);

	const truncatedZna = truncateDomain(zna, 20);
	const truncatedCreatorAddress = truncateAddress(creator);
	const mediaVariant = isMediaAnimated ? 'video' : 'image';

	const detailContent: DetailsContentType[] = [
		{
			id: 'creator',
			title: 'Creator',
			text: truncatedCreatorAddress,
			isLoading: isLoading,
			as: 'span' as const,
		},
		{
			id: 'highest-bid',
			title: 'Highest Bid',
			text: highestBidAsString,
			isLoading: isLoading,
			as: 'span' as const,
		},
	];

	const content =
		step === Step.COMPLETE ? detailContent.slice(0, -1) : detailContent;

	return (
		<ModalDetailsContainer variant={mediaVariant}>
			<Media alt={imageAlt} src={imageSrc} variant={mediaVariant} />
			<ModalDetails
				content={content}
				isLoadingTitle={isLoading}
				truncatedZna={truncatedZna}
				title={title}
			/>
		</ModalDetailsContainer>
	);
};
