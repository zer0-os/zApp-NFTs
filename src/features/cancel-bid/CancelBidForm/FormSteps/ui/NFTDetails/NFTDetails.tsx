import React, { FC } from 'react';

import { Step } from '../../hooks';
import { useCancelBidData } from '../../../../useCancelBidData';
import { formatEthers } from '../../../../../../lib/util';
import { truncateAddress, truncateDomain } from '@zero-tech/zui/utils';

import { SkeletonText, TextStack } from '@zero-tech/zui/components';
import { IpfsMedia } from '@zero-tech/zapp-utils/components';

import styles from './NFTDetails.module.scss';

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
		highestBid,
		highestUserBid,
		paymentTokenSymbol,
		isLoading,
	} = useCancelBidData(zna);

	const truncatedZna = truncateDomain(zna, 20);
	const truncatedCreatorAddress = truncateAddress(creator);

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
		<div className={styles.Container}>
			<div className={styles.Media}>
				<IpfsMedia className={styles.Image} alt={imageAlt} src={imageSrc} />
			</div>
			<div className={styles.Details}>
				<div className={styles.Domain}>
					<h2 className={styles.Title}>
						<SkeletonText asyncText={{ isLoading: isLoading, text: title }} />
					</h2>
					<span className={styles.ZNA}>0://{truncatedZna}</span>
				</div>
				<ul className={styles.TextContent}>
					{content.map((e) => (
						<li key={e.id}>
							<TextStack
								label={e.title}
								primaryText={{
									text: e.text,
									isLoading: e.isLoading,
								}}
								secondaryText={''}
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
