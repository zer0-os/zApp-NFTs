import { FC } from 'react';

import { StatsList } from '../../ui';

import { formatEthers, formatNumber } from '../../../lib/util/number/number';
import { useDomainMetrics } from '../../../lib/hooks/useDomainMetrics';
import { getDomainId } from '../../../lib/util/domains/domains';
import { usePaymentToken } from '../../../lib/hooks/usePaymentToken';

interface SubdomainMetricsProps {
	zna: string;
}

export const SubdomainMetrics: FC<SubdomainMetricsProps> = ({ zna }) => {
	const domainId = getDomainId(zna);

	const { data: metrics, isLoading: isLoadingMetrics } =
		useDomainMetrics(domainId);
	const { data: paymentToken } = usePaymentToken(zna);

	const paymentTokenLabel = paymentToken?.symbol
		? ` (${paymentToken?.symbol})`
		: '';

	const itemsInDomain =
		metrics?.items !== undefined ? formatNumber(metrics?.items) : undefined;

	const floorPriceString = metrics?.lowestSale
		? formatEthers(metrics?.lowestSale)
		: undefined;

	const volumeString = metrics?.volume?.all
		? formatEthers(metrics?.volume?.all)
		: undefined;

	const stats = [
		{
			title: 'Items In Domain',
			value: {
				text: itemsInDomain,
				isLoading: isLoadingMetrics,
			},
		},
		{
			title: 'Floor Price ' + paymentTokenLabel,
			value: {
				text: floorPriceString,
				isLoading: isLoadingMetrics,
			},
		},
		{
			title: 'Volume ' + paymentTokenLabel,
			value: {
				text: volumeString,
				isLoading: isLoadingMetrics,
			},
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
