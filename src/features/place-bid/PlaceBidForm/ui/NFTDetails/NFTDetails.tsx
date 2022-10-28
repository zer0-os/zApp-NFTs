import { FC } from 'react';

import { usePlaceBidData } from '../../../usePlaceBidData';
import { formatEthers } from '../../../../../lib/util/number';
import { truncateDomain } from '../../../../../lib/util/domains';
import { truncateAddress } from '@zero-tech/zapp-utils/formatting/addresses';

import { ViewBidsButton } from '../../../../view-bids';
import { SkeletonText } from '@zero-tech/zui/components';
import { IpfsMedia } from '@zero-tech/zapp-utils/components';

import styles from './NFTDetails.module.scss';

interface NFTDetailsProps {
	domainId: string;
}

export const NFTDetails: FC<NFTDetailsProps> = ({ domainId }) => {
	const {
		zna,
		title,
		creator,
		imageAlt,
		imageSrc,
		highestBid,
		isLoadingDomain,
		isLoadingMetrics,
		isLoadingMetadata,
	} = usePlaceBidData(domainId);

	const truncatedZna = truncateDomain(zna, 20);
	const truncatedCreatorAddress = truncateAddress(creator);
	const formattedHighestBid = formatEthers(highestBid);

	const textContent = [
		{
			id: 'title',
			className: styles.Title,
			text: title,
			isLoading: isLoadingMetadata,
			as: 'h1' as const,
		},
		{
			id: 'zna',
			className: styles.ZNA,
			text: `0://${truncatedZna}`,
			isLoading: isLoadingDomain,
			as: 'span' as const,
		},
		{
			id: 'highest-bid',
			title: 'HighestBid',
			className: styles.InfoValue,
			text: formattedHighestBid,
			isLoading: isLoadingMetrics,
			as: 'span' as const,
		},
		{
			id: 'creator',
			title: 'Creator',
			className: styles.InfoValue,
			text: truncatedCreatorAddress,
			isLoading: isLoadingDomain,
			as: 'span' as const,
		},
	];

	return (
		<div className={styles.Container}>
			<div className={styles.Media}>
				<IpfsMedia className={styles.Image} alt={imageAlt} src={imageSrc} />
			</div>
			<div className={styles.Details}>
				<ul className={styles.TextContent}>
					{textContent.map((e) => (
						<li key={e.id}>
							{e?.title && <span className={styles.InfoTitle}>{e.title}</span>}

							<SkeletonText
								className={e.className}
								as={e.as}
								asyncText={{
									text: e.text,
									isLoading: e.isLoading,
								}}
							/>
						</li>
					))}
				</ul>

				<div className={styles.ActionContainer}>
					<ViewBidsButton variant="text" />
				</div>
			</div>
		</div>
	);
};
