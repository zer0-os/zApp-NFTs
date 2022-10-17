import { FC } from 'react';

import { StatsList } from '../../ui/StatsList';

import { ethers } from 'ethers';
import { DomainMetrics, TokenPriceInfo } from '@zero-tech/zns-sdk';

import { useBidData } from '../../../lib/hooks/useBidData';
import { useDomainMetrics } from '../../../lib/hooks/useDomainMetrics';
import { usePaymentTokenInfo } from '../../../lib/hooks/usePaymentTokenInfo';
import { usePaymentTokenForDomain } from '../../../lib/hooks/usePaymentTokenForDomain';
import { useDataContainer } from '../../../lib/hooks/useDataContainer';

import { formatEthers, formatNumber } from '../../../lib/util/number/number';

type NFTMetricsProps = {
	domainId: string;
};

export const NFTMetrics: FC<NFTMetricsProps> = ({ domainId }) => {
	const { bids, paymentTokenInfo, metrics, isMetricsLoading } =
		useDataContainer(domainId);

	const paymentTokenLabel = paymentTokenInfo?.name
		? ` (${paymentTokenInfo?.name})`
		: '';

	const numberOfBids = bids
		? (formatNumber(bids?.length) || 0).toLocaleString()
		: undefined;

	const lastSale = metrics?.lastSale
		? formatEthers(metrics?.lastSale) + paymentTokenLabel
		: undefined;

	const volumeString = metrics?.volume?.all
		? formatEthers(metrics?.volume?.all) + paymentTokenLabel
		: undefined;

	const stats = [
		{
			title: 'Bids',
			value: {
				isLoading: isMetricsLoading,
				text: numberOfBids,
			},
		},
		{
			title: 'Last Sale',
			value: {
				isLoading: isMetricsLoading,
				text: lastSale,
			},
		},
		{
			title: 'Volume',
			value: {
				isLoading: isMetricsLoading,
				text: volumeString,
			},
		},
	];

	/*
	 * LEAVING COMMENT HERE FOR REUSE
	 */

	// const stats = [
	// 	{
	// 		title: 'Bids',
	// 		value: !isLoading && (bids?.length || 0).toLocaleString(),
	// 	},
	// 	{
	// 		title: 'Last Sale',
	// 		value: metrics?.lastSale
	// 			? `${formatEthers(metrics.lastSale)} WILD`
	// 			: 'No sales',
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
	// 		value: (metrics?.volume as any)?.all
	// 			? `${formatEthers((metrics.volume as any).all)} WILD`
	// 			: String(0),
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
