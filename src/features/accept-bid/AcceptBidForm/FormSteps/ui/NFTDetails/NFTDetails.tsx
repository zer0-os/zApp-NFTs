import { FC } from 'react';

import { formatEthers } from '../../../../../../lib/util';
import { useAcceptBidData } from '../../../../useAcceptBidData';
import { truncateAddress, truncateDomain } from '@zero-tech/zui/utils';

import {
	DetailsContentType,
	ModalDetailsContainer,
	Media,
	ModalDetails,
} from '../../../../..//ui';

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
		isMetadataLocked,
		isLoadingDomain,
		isLoadingBidData,
		isLoadingMetadata,
	} = useAcceptBidData(zna);

	const truncatedZna = truncateDomain(zna, 20);
	const truncatedCreatorAddress = truncateAddress(creator);
	const highestBidString = highestBid ? formatEthers(highestBid?.amount) : '-';
	const mediaVariant = isMediaAnimated ? 'video' : 'image';

	const detailContent: DetailsContentType[] = [
		{
			id: 'highest-bid',
			title: 'Highest Bid',
			text: `${highestBidString} ${paymentTokenSymbol}`,
			isLoading: isLoadingBidData,
			as: 'span' as const,
		},
		{
			id: 'creator',
			title: 'Creator',
			text: truncatedCreatorAddress,
			isLoading: isLoadingDomain,
			as: 'span' as const,
		},
		{
			id: 'metadata-state',
			title: 'Metadata State',
			text: isMetadataLocked,
			isLoading: isLoadingMetadata,
			as: 'span' as const,
		},
	];

	return (
		<ModalDetailsContainer variant={mediaVariant}>
			<Media alt={imageAlt} src={imageSrc} variant={mediaVariant} />
			<ModalDetails
				content={detailContent}
				isLoadingTitle={isLoadingMetadata}
				truncatedZna={truncatedZna}
				title={title}
			/>
		</ModalDetailsContainer>
	);
};
