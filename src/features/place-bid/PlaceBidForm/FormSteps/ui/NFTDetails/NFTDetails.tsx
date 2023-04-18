import React, { FC } from 'react';

import { formatEthers } from '../../../../../../lib/util';
import { usePlaceBidData } from '../../../../usePlaceBidData';
import { truncateAddress, truncateDomain } from '@zero-tech/zui/utils';

import { ViewBidsButton } from '../../../../../view-bids';
import { SkeletonText, TextStack } from '@zero-tech/zui/components';
import { IpfsMedia } from '@zero-tech/zapp-utils/components';

import styles from './NFTDetails.module.scss';

export interface NFTDetailsProps {
	zna: string;
}

export const NFTDetails: FC<NFTDetailsProps> = ({ zna }) => {
	const {
		bids,
		title,
		creator,
		imageAlt,
		imageSrc,
		highestBid,
		paymentTokenSymbol,
		isLoadingDomain,
		isLoadingBidData,
		isLoadingMetadata,
	} = usePlaceBidData(zna);

	const isExistingBids = bids?.length !== 0;
	const truncatedZna = truncateDomain(zna, 20);
	const truncatedCreatorAddress = truncateAddress(creator);
	const highestBidString = highestBid ? formatEthers(highestBid?.amount) : '-';

	const textContent = [
		{
			id: 'creator',
			title: 'Creator',
			className: styles.InfoValue,
			text: truncatedCreatorAddress,
			isLoading: isLoadingDomain,
			as: 'span' as const,
		},
		{
			id: 'highest-bid',
			title: 'Highest Bid',
			className: styles.InfoValue,
			text: `${highestBidString} ${isExistingBids ? paymentTokenSymbol : ''}`,
			isLoading: isLoadingBidData,
			as: 'span' as const,
		},
	];

	return (
		<div className={styles.Container}>
			<div className={styles.Media}>
				<IpfsMedia className={styles.Image} alt={imageAlt} src={imageSrc} />
			</div>
			<div className={styles.Details}>
				<div className={styles.Domain}>
					<h2 className={styles.Title}>
						<SkeletonText asyncText={{ isLoading: isLoadingMetadata, title }} />
					</h2>
					<span className={styles.ZNA}>0://{truncatedZna}</span>
				</div>
				<ul className={styles.TextContent}>
					{textContent.map((e) => (
						<li key={e.id}>
							<TextStack
								label={e.title}
								primaryText={{
									text: e.text,
									isLoading: e.isLoading,
								}}
							/>
						</li>
					))}
				</ul>

				{isExistingBids && (
					<div className={styles.ActionContainer}>
						<ViewBidsButton zna={zna} variant="text" />
					</div>
				)}
			</div>
		</div>
	);
};
