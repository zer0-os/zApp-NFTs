import { FC, useCallback } from 'react';

import { useSubdomainTableItem } from '../useSubdomainTableItem';

import { getDomainId } from '../../../lib/util';
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
	const domainId = getDomainId(zna);
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

	const buyNowPriceString = buyNowPrice ? buyNowPrice : highestBid;

	const label =
		(buyNowPriceString ? 'Buy Now' : 'Top Bid') + ' ' + paymentTokenLabel;

	const button = buyNowPrice ? (
		<BuyNowButton />
	) : (
		<PlaceBidButton domainId={domainId} isRoot />
	);

	const handleOnClick = useCallback(() => {
		onClick(undefined, zna);
	}, [zna, onClick]);

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
					text: buyNowPriceString,
					isLoading: isLoadingMetrics,
				}}
				secondaryText={''}
				button={button}
			/>
		</GridCard>
	);
};
