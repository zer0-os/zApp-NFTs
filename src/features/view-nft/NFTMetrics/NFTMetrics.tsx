//- React Imports
import { FC } from 'react';

//- Features Imports
import StatsList from '../../ui/StatsList/StatsList';

//- Library Imports
import { ethers } from 'ethers';
import { DomainMetrics, TokenPriceInfo } from '@zero-tech/zns-sdk';
import { Bid } from '@zero-tech/zns-sdk/lib/zAuction';

//- Utils Imports
import { formatEthers, formatNumber } from '../../../lib/util/number/number';

type NFTMetricsProps = {
	bids: Bid[];
	metrics: DomainMetrics;
	isLoading?: boolean;
	paymentTokenInfo: TokenPriceInfo;
};

const NFTMetrics: FC<NFTMetricsProps> = ({
	bids,
	metrics,
	isLoading,
	paymentTokenInfo,
}) => {
	const stats = [
		{
			title: 'Bids',
			value: !isLoading && (bids?.length || 0).toLocaleString(),
		},
		{
			title: 'Last Sale',
			value: metrics?.lastSale
				? `${formatEthers(metrics.lastSale)} WILD`
				: 'No sales',
			text:
				metrics?.lowestSale && paymentTokenInfo?.price
					? `$${formatNumber(
							Number(ethers.utils.formatEther(metrics.lowestSale)) *
								paymentTokenInfo.price,
					  )}`
					: 0,
		},
		{
			title: 'Volume',
			value: (metrics?.volume as any)?.all
				? `${formatEthers((metrics.volume as any).all)} WILD`
				: String(0),
			text:
				(metrics?.volume as any)?.all && paymentTokenInfo?.price
					? `$${formatNumber(
							Number(ethers.utils.formatEther(metrics.volume.all)) *
								paymentTokenInfo.price,
					  )}`
					: 0,
		},
	];

	return <StatsList stats={stats} />;
};

export default NFTMetrics;
