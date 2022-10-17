import { FC } from 'react';

import { DomainMetrics, TokenPriceInfo } from '@zero-tech/zns-sdk';

import { StatsList } from '../../ui/StatsList';

import { formatEthers, formatNumber } from '../../../lib/util/number/number';

import { useDataContainer } from '../../../lib/hooks/useDataContainer';

interface SubdomainMetricsProps {
	domainId?: string;
}

// const getMetricsLabels = (metrics: DomainMetrics) => {};

export const SubdomainMetrics: FC<SubdomainMetricsProps> = ({ domainId }) => {
	const { metrics, isMetricsLoading, paymentTokenInfo } =
		useDataContainer(domainId);

	const DEFAULT = { isMetricsLoading };

	const paymentTokenLabel = paymentTokenInfo?.name
		? ` (${paymentTokenInfo?.name})`
		: '';

	const itemsInDomain = metrics?.items
		? formatNumber(metrics?.items) + paymentTokenLabel
		: undefined;

	const floorPriceString = metrics?.lowestSale
		? formatEthers(metrics?.lowestSale) + paymentTokenLabel
		: undefined;

	const volumeString = metrics?.volume?.all
		? formatEthers(metrics?.volume?.all) + paymentTokenLabel
		: undefined;

	const stats = [
		{
			title: 'Items In Domain',
			value: {
				isLoading,
				text: itemsInDomain,
			},
			...DEFAULT,
		},
		{
			title: 'Floor Price',
			value: {
				isLoading,
				text: floorPriceString,
			},
			...DEFAULT,
		},
		{
			title: 'Volume',
			value: {
				isLoading,
				text: volumeString,
			},
			...DEFAULT,
		},
	];

	/*
	 * LEAVING COMMENT HERE FOR REUSE
	 */

	// const stats = [
	// 	{ title: 'Items In Domain', { value } },
	// 	{
	// 		title: 'Floor Price',
	// 		value:
	// 			metrics?.lowestSale && paymentTokenInfo?.name
	// 				? `${formatEthers(metrics.lowestSale)} ${paymentTokenInfo.name}`
	// 				: 'No sales',
	// 		text:
	// 			metrics?.lowestSale && paymentTokenInfo?.price
	// 				? `$${formatNumber(
	// 						Number(ethers.utils.formatEther(metrics.lowestSale)) *
	// 							paymentTokenInfo.price,
	// 				  )}`
	// 				: 0,
	// 	},
	// 	{
	// 		title: 'Volume',
	// 		value:
	// 			(metrics?.volume as any)?.all && paymentTokenInfo?.name
	// 				? `${formatEthers((metrics.volume as any).all)} ${
	// 						paymentTokenInfo.name
	// 				  }`
	// 				: String(0),
	// 		text:
	// 			(metrics?.volume as any)?.all && paymentTokenInfo?.price
	// 				? `$${formatNumber(
	// 						Number(ethers.utils.formatEther(metrics.volume.all)) *
	// 							paymentTokenInfo.price,
	// 				  )}`
	// 				: 0,
	// 	},
	// ];

	return <StatsList stats={stats} />;
};
