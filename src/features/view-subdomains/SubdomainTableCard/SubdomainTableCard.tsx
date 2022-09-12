import { FC } from 'react';

import { ethers } from 'ethers';
import { TokenPriceInfo } from '@zero-tech/zns-sdk';

import { useDomainMetadata } from '../../../lib/hooks/useDomainMetadata';
import { useDomainMetrics } from '../../../lib/hooks/useDomainMetrics';
import { formatEthers, formatNumber } from '../../../lib/util/number/number';
import { useBuyNowPrice } from '../../../lib/hooks/useBuyNowPrice';

import { PlaceBidButton } from '../../place-bid';
import { BuyNowButton } from '../../buy-now';
import { TableCard } from '../../ui/TableCard';

import styles from './SubdomainTableCard.module.scss';

type SubdomainTableCardProps = {
	domainId: string;
	domainName: string;
	domainMetadataUri: string;
	paymentTokenData: TokenPriceInfo;
	onCardClick: (e?: any, domainName?: string) => void;
};

export const SubdomainTableCard: FC<SubdomainTableCardProps> = ({
	domainId,
	domainName,
	domainMetadataUri,
	paymentTokenData,
	onCardClick,
}) => {
	const { data: domainMetrics } = useDomainMetrics(domainId);
	const { data: buyNowPrice } = useBuyNowPrice(domainId);
	const { data: domainMetadata } = useDomainMetadata(domainMetadataUri);

	return (
		<TableCard
			header={domainMetadata?.title}
			subHeader={`0://${domainName}`}
			onClick={(e) => onCardClick(e, domainName)}
		>
			<div className={styles.Container}>
				<div className={styles.Bid}>
					<label>Top Bid</label>
					<span className={styles.Crypto}>
						{domainMetrics?.highestBid
							? formatEthers(domainMetrics?.highestBid)
							: 0}{' '}
						{paymentTokenData?.name}{' '}
					</span>
					<span className={styles.Fiat}>
						$
						{domainMetrics?.highestBid
							? formatNumber(
									Number(ethers.utils.formatEther(domainMetrics?.highestBid)) *
										Number(paymentTokenData?.price),
							  )
							: 0}{' '}
					</span>
				</div>
				<div className={styles.ButtonContainer}>
					{buyNowPrice ? <BuyNowButton /> : <PlaceBidButton isRoot />}
				</div>
			</div>
		</TableCard>
	);
};
