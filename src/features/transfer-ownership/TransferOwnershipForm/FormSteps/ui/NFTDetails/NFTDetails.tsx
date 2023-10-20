import React, { FC } from 'react';

import { formatEthers } from '../../../../../../lib/util';
import { useTransferOwnershipData } from '../../../../useTransferOwnershipData';
import { truncateAddress, truncateDomain } from '@zero-tech/zui/utils';

import { ModalDetailsContainer, Media, ModalDetails } from '../../../../../ui';

export interface NFTDetailsProps {
	zna: string;
}

export const NFTDetails: FC<NFTDetailsProps> = ({ zna }) => {
	const {
		title,
		creator,
		imageAlt,
		imageSrc,
		isMediaAnimated,
		highestBid,
		paymentTokenSymbol,
		isLoading,
	} = useTransferOwnershipData(zna);

	const truncatedZna = truncateDomain(zna, 20);
	const truncatedCreatorAddress = truncateAddress(creator);
	const mediaVariant = isMediaAnimated ? 'video' : 'image';

	const formattedHighestBid = highestBid
		? `${formatEthers(highestBid?.amount)} ${paymentTokenSymbol}`
		: '-';

	const detailContent = [
		{
			id: 'highest-bid',
			title: 'Highest Bid',
			text: formattedHighestBid,
			isLoading: isLoading,
		},
		{
			id: 'creator',
			title: 'Creator',
			text: truncatedCreatorAddress,
			isLoading: isLoading,
		},
	];

	return (
		<ModalDetailsContainer variant={mediaVariant}>
			<Media alt={imageAlt} src={imageSrc} variant={mediaVariant} />
			<ModalDetails
				content={detailContent}
				isLoadingTitle={isLoading}
				truncatedZna={truncatedZna}
				title={title}
			/>
		</ModalDetailsContainer>
	);
};
