import { FC } from 'react';

import { ethers } from 'ethers';
import { DomainMetrics, TokenPriceInfo } from '@zero-tech/zns-sdk';

import { StatsList } from '../../ui/StatsList';

import { formatEthers, formatNumber } from '../../../lib/util/number/number';
import { useDomainMetrics } from '../../../lib/hooks/useDomainMetrics';

interface SubdomainMetricsProps {
	domainId?: string;
	paymentTokenInfo: TokenPriceInfo;
}

const getMetricsLabels = (metrics: DomainMetrics) => {};

export const SubdomainMetrics: FC<SubdomainMetricsProps> = ({
	domainId,
	paymentTokenInfo,
}) => {
	const { data: metrics, isLoading } = useDomainMetrics(domainId);

	const DEFAULT = { isLoading };

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
			value: itemsInDomain,
			...DEFAULT,
		},
		{
			title: 'Floor Price',
			value: floorPriceString,
			...DEFAULT,
		},
		{
			title: 'Volume',
			value: volumeString,
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
