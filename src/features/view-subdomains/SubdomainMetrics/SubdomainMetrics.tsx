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

	const DEFAULT = { isLoading: isLoadingMetrics };

	const paymentTokenLabel = paymentToken?.name
		? ` (${paymentToken?.name})`
		: '';

	const itemsInDomain =
		metrics?.items !== undefined
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
				...DEFAULT,
				text: itemsInDomain,
			},
		},
		{
			title: 'Floor Price',
			value: {
				...DEFAULT,
				text: floorPriceString,
			},
		},
		{
			title: 'Volume',
			value: {
				...DEFAULT,
				text: volumeString,
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
