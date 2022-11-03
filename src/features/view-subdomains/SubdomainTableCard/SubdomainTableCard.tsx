import { FC, useCallback } from 'react';

import { useSubdomainTableItem } from '../useSubdomainTableItem';

import { getCloudinaryUrlFromIpfs } from '@zero-tech/zapp-utils/utils/cloudinary';

import { PlaceBidButton } from '../../place-bid';
import { BuyNowButton } from '../../buy-now';
import { GridCard } from '@zero-tech/zui/components/GridCard';
import { NFT } from '@zero-tech/zui/components/GridCard/templates/NFT';

import styles from './SubdomainTableCard.module.scss';

type SubdomainTableCardProps = {
	zna: string;
	onClick: (e?: any, domainName?: string) => void;
};

export const SubdomainTableCard: FC<SubdomainTableCardProps> = ({
	zna,
	onClick,
}) => {
	const {
		highestBid,
		buyNowPrice,
		metadata,
		image,
		alt,
		isLoadingMetrics,
		isLoadingMetadata,
		paymentTokenLabel,
	} = useSubdomainTableItem({
		zna,
	});

	const metric = buyNowPrice ? buyNowPrice : highestBid;
	const label = (buyNowPrice ? 'Buy Now' : 'Top Bid') + ' ' + paymentTokenLabel;

	const button = buyNowPrice ? (
		<BuyNowButton />
	) : (
		<PlaceBidButton zna={zna} isRoot />
	);

	const handleOnClick = useCallback(
		(event: any) => {
			if (event.currentTarget.contains(event.target)) {
				onClick(undefined, zna);
			}
		},
		[zna, onClick],
	);

	return (
		<GridCard
			className={styles.Container}
			imageSrc={
				image &&
				getCloudinaryUrlFromIpfs(image, 'image', {
					size: 'medium',
					fit: 'fill',
				})
			}
			aspectRatio={1}
			imageAlt={alt}
			onClick={handleOnClick}
		>
			<NFT
				title={{
					text: metadata?.title,
					isLoading: isLoadingMetadata,
					errorText: 'Failed to load!',
				}}
				zna={zna}
				label={label}
				primaryText={{
					text: metric,
					isLoading: isLoadingMetrics,
				}}
				secondaryText={''}
				button={button}
			/>
		</GridCard>
	);
};
