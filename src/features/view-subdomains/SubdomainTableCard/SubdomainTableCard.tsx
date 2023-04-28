import { FC, memo, useCallback } from 'react';
import { useQuery } from 'react-query';

import { useSubdomainTableItem } from '../useSubdomainTableItem';
import { formatEthers } from '../../../lib/util';

import {
	getCloudinaryUrlFromIpfs,
	getCloudinaryVideoPoster,
} from '@zero-tech/zapp-utils/utils/cloudinary';
import { getHashFromIpfsUrl } from '@zero-tech/zapp-utils/utils/ipfs';

import { PlaceBidButton } from '../../place-bid';
import { BuyNowButton } from '../../buy-now';
import { GridCard } from '@zero-tech/zui/components/GridCard';
import { NFT } from '@zero-tech/zui/components/GridCard/templates/NFT';

import styles from './SubdomainTableCard.module.scss';

type SubdomainTableCardProps = {
	zna: string;
};

const Card: FC<SubdomainTableCardProps> = ({ zna }) => {
	const {
		highestBidAmount,
		buyNowPrice,
		metadata,
		image,
		alt,
		isLoading,
		paymentTokenLabel,
		handleItemClick,
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

	const metric = buyNowPrice?.price
		? formatEthers(buyNowPrice.price.toString())
		: highestBidAmount;
	const label = (buyNowPrice ? 'Buy Now' : 'Top Bid') + ' ' + paymentTokenLabel;

	const button = buyNowPrice ? (
		<BuyNowButton zna={zna} trigger={'Buy'} />
	) : (
		<PlaceBidButton zna={zna} trigger={'Bid'} />
	);

	const handleOnClick = useCallback(
		(event: any) => {
			if (event.currentTarget.contains(event.target)) {
				handleItemClick(undefined, zna);
			}
		},
		[zna, handleItemClick],
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
					isLoading: isLoading,
					errorText: '-',
				}}
				zna={zna}
				label={label}
				primaryText={{
					text: metric,
					isLoading: isLoading,
					errorText: '-',
				}}
				secondaryText={''}
				button={button}
			/>
		</GridCard>
	);
};

export const SubdomainTableCard = memo(Card);
