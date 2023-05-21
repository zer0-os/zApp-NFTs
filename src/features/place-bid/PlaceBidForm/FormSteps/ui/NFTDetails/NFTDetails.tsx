import React, { FC } from 'react';

import { formatEthers } from '../../../../../../lib/util';
import { usePlaceBidData } from '../../../../usePlaceBidData';
import { truncateAddress, truncateDomain } from '@zero-tech/zui/utils';

import { ViewBidsButton } from '../../../../../view-bids';
import { Media, ModalDetails, ModalDetailsContainer } from '../../../../../ui';

export interface NFTDetailsProps {
	zna: string;
}

export const NFTDetails: FC<NFTDetailsProps> = ({ zna }) => {
	const {
		bids,
		title,
		creator,
		imageAlt,
		imageSrc,
		isMediaAnimated,
		highestBid,
		paymentTokenSymbol,
		isLoadingDomain,
		isLoadingBidData,
		isLoadingMetadata,
	} = usePlaceBidData(zna);

	const isExistingBids = bids?.length !== 0;
	const truncatedZna = truncateDomain(zna, 20);
	const truncatedCreatorAddress = truncateAddress(creator);
	const highestBidString = highestBid ? formatEthers(highestBid?.amount) : '-';
	const mediaVariant = isMediaAnimated ? 'video' : 'image';

	const textContent = [
		{
			id: 'creator',
			title: 'Creator',
			text: truncatedCreatorAddress,
			isLoading: isLoadingDomain,
			as: 'span' as const,
		},
		{
			id: 'highest-bid',
			title: 'Highest Bid',
			text: `${highestBidString} ${isExistingBids ? paymentTokenSymbol : ''}`,
			isLoading: isLoadingBidData,
			as: 'span' as const,
		},
	];

	return (
		<ModalDetailsContainer variant={mediaVariant}>
			<Media alt={imageAlt} src={imageSrc} variant={mediaVariant} />
			<ModalDetails
				content={textContent}
				truncatedZna={truncatedZna}
				isLoadingTitle={isLoadingMetadata}
				title={title}
			>
				{isExistingBids && <ViewBidsButton zna={zna} variant="text" />}
			</ModalDetails>
		</ModalDetailsContainer>
	);
};
