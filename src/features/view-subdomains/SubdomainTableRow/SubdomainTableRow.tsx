import { FC, memo, useCallback } from 'react';

import { useSubdomainTableItem } from '../useSubdomainTableItem';

import { PlaceBidButton } from '../../place-bid';
import { BuyNowButton } from '../../buy-now';
import { SkeletonText } from '@zero-tech/zui/components/SkeletonText';
import { Cell } from '@zero-tech/zui/components/Table';
import { IpfsMedia } from '@zero-tech/zapp-utils/components';

import styles from './SubdomainTableRow.module.scss';

type SubdomainTableRowProps = {
	zna: string;
};

const Row: FC<SubdomainTableRowProps> = ({ zna }) => {
	const {
		highestBidAmount,
		paymentTokenLabel,
		buyNowPrice,
		metadata,
		image,
		alt,
		isLoading,
		isOwnedByUser,
		handleItemClick,
	} = useSubdomainTableItem({
		zna,
	});

	const handleOnClick = useCallback(
		(event: any) => {
			if (event.currentTarget.contains(event.target)) {
				handleItemClick(event, zna);
			}
		},
		[zna, handleItemClick],
	);

	return (
		<tr onClick={handleOnClick} className={styles.Container}>
			<Cell alignment={'left'} className={styles.NFT}>
				<div>
					<IpfsMedia
						className={styles.Thumbnail}
						src={image}
						alt={alt}
						options={{ size: 'small', fit: 'fill' }}
						asImage={true}
					/>

					<div className={styles.Info}>
						<SkeletonText
							asyncText={{
								text: metadata?.title,
								isLoading: isLoading,
							}}
						/>
						<span>0://{zna}</span>
					</div>
				</div>
			</Cell>
			<Cell alignment={'right'} className={styles.Metrics}>
				<SkeletonText
					asyncText={{
						text:
							highestBidAmount && `${highestBidAmount} ${paymentTokenLabel}`,
						isLoading: isLoading,
						errorText: '-',
					}}
				/>
			</Cell>

			<Cell alignment={'right'} className={styles.Button}>
				{!isOwnedByUser &&
					(buyNowPrice ? (
						<BuyNowButton zna={zna} trigger={'Buy'} />
					) : (
						<PlaceBidButton zna={zna} trigger={'Bid'} />
					))}
			</Cell>
		</tr>
	);
};

export const SubdomainTableRow = memo(Row);
