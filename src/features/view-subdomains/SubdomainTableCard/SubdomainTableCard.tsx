import { FC, useCallback } from 'react';
import { useQuery } from 'react-query';

import {
	getCloudinaryUrlFromIpfs,
	getCloudinaryVideoPoster,
} from '@zero-tech/zapp-utils/utils/cloudinary';
import { getHashFromIpfsUrl } from '@zero-tech/zapp-utils/utils/ipfs';
import { useSubdomainTableItem } from '../useSubdomainTableItem';

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

	/*
	 * NOTE: this query is here because some metadata `image`s are actually videos, which
	 * have a different Cloudinary endpoint. This is not necessary in SubdomainTableRow
	 * because we use IpfsMedia directly.
	 */
	const { data: imageSrc } = useQuery(['image', { image }], async () => {
		const url = getCloudinaryUrlFromIpfs(image, 'image', {
			size: 'medium',
			fit: 'fill',
		});
		const res = await fetch(url, { method: 'HEAD' });
		if (res.status === 200) {
			return url;
		} else {
			return getCloudinaryVideoPoster(getHashFromIpfsUrl(image));
		}
	});

	const metric = buyNowPrice ? buyNowPrice : highestBid;
	const label = (buyNowPrice ? 'Buy Now' : 'Top Bid') + ' ' + paymentTokenLabel;

	const button = buyNowPrice ? (
		<BuyNowButton zna={zna} />
	) : (
		<PlaceBidButton zna={zna} trigger={'Bid'} />
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
			imageSrc={imageSrc}
			aspectRatio={1}
			imageAlt={alt}
			onClick={handleOnClick}
		>
			<NFT
				title={{
					text: metadata?.title,
					isLoading: isLoadingMetadata,
					errorText: '-',
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
