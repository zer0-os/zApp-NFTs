import { FC } from 'react';

import { useAcceptBidData } from '../../../useAcceptBidData';
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
		domain,
		isDomainLoading,
		metrics,
		isMetricsLoading,
		metadata,
		isMetadataLoading,
		imageAlt,
		imageSrc,
	} = useAcceptBidData(domainId);

	const truncatedZna = truncateDomain(domain?.name, 20);
	const truncatedCreatorAddress = truncateAddress(domain?.minter);
	const formattedHighestBid = formatEthers(metrics?.highestBid);

	const textContent = [
		{
			id: 'title',
			className: styles.Title,
			text: metadata?.title,
			isLoading: isMetadataLoading,
			as: 'h1' as const,
		},
		{
			id: 'zna',
			className: styles.ZNA,
			text: `0://${truncatedZna}`,
			isLoading: isDomainLoading,
			as: 'span' as const,
		},
		{
			id: 'highest-bid',
			title: 'HighestBid',
			className: styles.InfoValue,
			text: formattedHighestBid,
			isLoading: isMetricsLoading,
			as: 'span' as const,
		},
		{
			id: 'creator',
			title: 'Creator',
			className: styles.InfoValue,
			text: truncatedCreatorAddress,
			isLoading: isDomainLoading,
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
