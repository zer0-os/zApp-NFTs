import React, { FC } from 'react';

import { Step } from '../../hooks';
import { useCancelBidData } from '../../../../useCancelBidData';
import { formatEthers } from '../../../../../../lib/util';
import { truncateAddress, truncateDomain } from '@zero-tech/zui';

import { Media, ModalDetails, ModalDetailsContainer } from '../../../../../ui';

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
		highestBid,
		highestUserBid,
		paymentTokenSymbol,
		isLoading,
	} = useCancelBidData(zna);

	const truncatedZna = truncateDomain(zna, 20);
	const truncatedCreatorAddress = truncateAddress(creator);
	const mediaVariant = isMediaAnimated ? 'video' : 'image';

	const formattedHighestBid = highestBid
		? `${formatEthers(highestBid.amount)} ${paymentTokenSymbol}`
		: '-';

	const formattedUserBid = highestUserBid
		? `${formatEthers(highestUserBid?.amount)} ${paymentTokenSymbol}`
		: '-';

	const detailContent = [
		{
			id: 'creator',
			title: 'Creator',
			text: truncatedCreatorAddress,
			isLoading: isLoading,
		},
		{
			id: 'highest-bid',
			title: 'Highest Bid',
			text: formattedHighestBid,
			isLoading: isLoading,
		},
		{
			id: 'your-bid',
			title: 'Your Bid',
			text: formattedUserBid,
			isLoading: isLoading,
		},
	];

	const content =
		step === Step.COMPLETE ? detailContent.slice(0, -1) : detailContent;

	return (
		<ModalDetailsContainer variant={mediaVariant}>
			<Media alt={imageAlt} src={imageSrc} variant={mediaVariant} />
			<ModalDetails
				content={content}
				truncatedZna={truncatedZna}
				isLoadingTitle={isLoading}
				title={title}
			/>
		</ModalDetailsContainer>
	);
};
