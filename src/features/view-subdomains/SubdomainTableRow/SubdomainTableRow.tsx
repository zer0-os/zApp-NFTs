import { FC, useCallback } from 'react';

import { getDomainId } from '../../../lib/util';
import { useSubdomainTableItem } from '../useSubdomainTableItem';

import { IpfsMedia } from '@zero-tech/zapp-utils/components';

import { PlaceBidButton } from '../../place-bid';
import { BuyNowButton } from '../../buy-now';
import { SkeletonText } from '@zero-tech/zui/components/SkeletonText';
import { TableData } from '@zero-tech/zui/components/AsyncTable/Column';

import styles from './SubdomainTableRow.module.scss';

type SubdomainTableRowProps = {
	zna: string;
	onClick: (e?: any, domainName?: string) => void;
};

export const SubdomainTableRow: FC<SubdomainTableRowProps> = ({
	zna,
	onClick,
}) => {
	const domainId = getDomainId(zna);
	const {
		volume,
		buyNowPrice,
		metadata,
		image,
		alt,
		isLoadingMetrics,
		isLoadingMetadata,
	} = useSubdomainTableItem({
		zna,
	});

	const handleOnClick = useCallback(
		(event: any) => {
			if (event.currentTarget.contains(event.target)) {
				onClick(event, zna);
			}
		},
		[zna, onClick],
	);

	return (
		<tr onClick={handleOnClick} className={styles.Container}>
			<TableData alignment={'left'} className={styles.NFT}>
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
								isLoading: isLoadingMetadata,
							}}
						/>
						<span>0://{zna}</span>
					</div>
				</div>
			</TableData>
			<TableData alignment={'right'} className={styles.Metrics}>
				<SkeletonText
					asyncText={{
						text: volume,
						isLoading: isLoadingMetrics,
					}}
				/>
			</TableData>

			<TableData alignment={'right'} className={styles.Button}>
				{buyNowPrice ? (
					<BuyNowButton />
				) : (
					<PlaceBidButton zna={zna} trigger={'Bid'} />
				)}
			</TableData>
		</tr>
	);
};
