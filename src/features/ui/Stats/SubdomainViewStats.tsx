//- React Imports
import type { FC, ReactNode } from 'react';

//- Library Imports
import { ethers } from 'ethers';
import { DomainMetrics, TokenPriceInfo } from '@zero-tech/zns-sdk';

//- Features Imports
import StatsWidget from '../StatsWidget/StatsWidget';

//- Utils Imports
import { formatEthers, formatNumber } from '../../../lib/util/number/number';

type SubdomainViewStatsProps = {
	metrics: DomainMetrics;
	paymentTokenInfo: TokenPriceInfo;
};

const SubdomainViewStats: FC<SubdomainViewStatsProps> = ({
	metrics,
	paymentTokenInfo,
}) => {
	const stats = [
		{ title: 'Items In Domain', value: formatNumber(metrics?.items) },
		{
			title: 'Floor Price',
			value:
				metrics?.lowestSale && paymentTokenInfo?.name
					? `${formatEthers(metrics.lowestSale)} ${paymentTokenInfo.name}`
					: 'No sales',
			text:
				metrics?.lowestSale && paymentTokenInfo?.price
					? formatNumber(
							Number(ethers.utils.formatEther(metrics.lowestSale)) *
								paymentTokenInfo.price,
					  )
					: 0,
		},
		{
			title: 'Volume',
			value:
				(metrics?.volume as any)?.all && paymentTokenInfo?.name
					? `${formatEthers((metrics.volume as any).all)} ${
							paymentTokenInfo.name
					  }`
					: String(0),
			text:
				(metrics?.volume as any)?.all && paymentTokenInfo?.price
					? formatNumber(
							Number(ethers.utils.formatEther(metrics.volume.all)) *
								paymentTokenInfo.price,
					  )
					: 0,
		},
	];

	return <StatsWidget stats={stats} />;
};

export default SubdomainViewStats;
