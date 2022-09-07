import { FC } from 'react';

import { ethers } from 'ethers';
import { TokenPriceInfo } from '@zero-tech/zns-sdk';

import { useDomainMetadata } from '../../../lib/hooks/useDomainMetadata';
import { useDomainMetrics } from '../../../lib/hooks/useDomainMetrics';
import { formatEthers, formatNumber } from '../../../lib/util/number/number';
import { useBuyNowPrice } from '../../../lib/hooks/useBuyNowPrice';

import { PlaceBidButton } from '../../place-bid';
import { BuyNowButton } from '../../buy-now';

import styles from './SubdomainTableRow.module.scss';

type SubdomainTableRowProps = {
	domainId: string;
	domainName: string;
	domainMetadataUri: string;
	paymentTokenData: TokenPriceInfo;
	onRowClick: (e?: any, domainName?: string) => void;
};

export const SubdomainTableRow: FC<SubdomainTableRowProps> = ({
	domainId,
	domainName,
	domainMetadataUri,
	paymentTokenData,
	onRowClick,
}) => {
	const { data: domainMetrics } = useDomainMetrics(domainId);
	const { data: buyNowPrice } = useBuyNowPrice(domainId);
	const { data: domainMetadata } = useDomainMetadata(domainMetadataUri);

	return (
		<tr onClick={(e) => onRowClick(e, domainName)} className={styles.Container}>
			<td>
				<div>{domainMetadata?.title}</div>
				<div>0://{domainName}</div>
			</td>
			<td className={styles.Metrics}>
				<div>
					{domainMetrics?.volume.all
						? formatEthers(domainMetrics?.volume.all)
						: 0}{' '}
					{paymentTokenData?.name}
				</div>
				<div>
					$
					{domainMetrics?.volume.all
						? formatNumber(
								Number(ethers.utils.formatEther(domainMetrics?.volume.all)) *
									paymentTokenData?.price,
						  )
						: 0}{' '}
				</div>
			</td>

			<td className={styles.Button}>
				{buyNowPrice ? <BuyNowButton /> : <PlaceBidButton isRoot />}
			</td>
		</tr>
	);
};
