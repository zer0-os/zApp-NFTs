//- React Imports
import { FC } from 'react';

//- Features Imports
import StatsWidget from '../StatsWidget/StatsWidget';

//- Library Imports
import { ethers } from 'ethers';
import {
	DomainBidEvent,
	DomainMetrics,
	TokenPriceInfo,
} from '@zero-tech/zns-sdk';

//- Utils Imports
import { formatEthers, formatNumber } from '../../../lib/util/number/number';

type NFTViewStatsProps = {
	bids: DomainBidEvent[];
	metrics: DomainMetrics;
	isLoading?: boolean;
	paymentTokenInfo: TokenPriceInfo;
};

const NFTViewStats: FC<NFTViewStatsProps> = ({
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

	return <StatsWidget stats={stats} />;
};

export default NFTViewStats;
