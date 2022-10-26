import { FC } from 'react';

import { useSubdomainData } from '../useSubdomainData';
import { formatEthers } from '../../../lib/util/number/number';
import { TokenPriceInfo } from '@zero-tech/zns-sdk';

import { getCloudinaryUrlFromIpfs } from '@zero-tech/zapp-utils/utils/cloudinary';

import { PlaceBidButton } from '../../place-bid';
import { BuyNowButton } from '../../buy-now';
import { GridCard } from '@zero-tech/zui/components/GridCard';
import { NFT } from '@zero-tech/zui/components/GridCard/templates/NFT';

import styles from './SubdomainTableCard.module.scss';

type SubdomainTableCardProps = {
	domainId: string;
	domainName: string;
	domainMetadataUri: string;
	paymentTokenData: TokenPriceInfo;
	onCardClick: (e?: any, domainName?: string) => void;
};

export const SubdomainTableCard: FC<SubdomainTableCardProps> = ({
	domainId,
	domainName,
	domainMetadataUri,
	onCardClick,
}) => {
	const {
		metrics,
		buyNowPrice,
		metadata,
		isMetadataLoading,
		isMetricsLoading,
		imageAlt,
		imageSrc,
		paymentTokenLabel,
	} = useSubdomainData({
		id: domainId,
		zna: domainName,
		metadataUri: domainMetadataUri,
	});

	const highestBidString = metrics?.highestBid
		? formatEthers(metrics?.highestBid)
		: undefined;

	const buyNowPriceString = buyNowPrice ? formatEthers(buyNowPrice) : undefined;

	const label =
		(buyNowPriceString ? 'Buy Now' : 'Top Bid') + ' ' + paymentTokenLabel;

	const button = buyNowPrice ? <BuyNowButton /> : <PlaceBidButton isRoot />;

	return (
		<GridCard
			className={styles.Container}
			imageSrc={
				imageSrc &&
				getCloudinaryUrlFromIpfs(imageSrc, 'image', {
					size: 'medium',
					fit: 'fill',
				})
			}
			aspectRatio={1}
			imageAlt={imageAlt}
			onClick={() => onCardClick(undefined, domainName)}
		>
			<NFT
				title={{
					text: metadata?.title,
					isLoading: isMetadataLoading,
					errorText: 'Failed to load!',
				}}
				zna={domainName}
				label={label}
				primaryText={{
					text: buyNowPriceString ?? highestBidString,
					isLoading: isMetricsLoading,
				}}
				secondaryText={''}
				button={button}
			/>
		</GridCard>
	);
};
