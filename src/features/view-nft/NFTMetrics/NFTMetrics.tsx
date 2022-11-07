import { FC } from 'react';

import { useBidData } from '../../../lib/hooks/useBidData';
import { formatEthers, formatNumber } from '../../../lib/util/number';
import { getDomainId, getParentZna } from '../../../lib/util/domains';
import { usePaymentToken } from '../../../lib/hooks/usePaymentToken';
import { useDomainMetrics } from '../../../lib/hooks/useDomainMetrics';

import { StatsList } from '../../ui';

type NFTMetricsProps = {
	zna: string;
};

export const NFTMetrics: FC<NFTMetricsProps> = ({ zna }) => {
	const domainId = getDomainId(zna);
	const parentZna = getParentZna(zna);

	const { data: paymentToken } = usePaymentToken(parentZna);
	const { data: bids, isLoading: isLoadingBids } = useBidData(domainId);
	const { data: metrics, isLoading: isLoadingMetrics } =
		useDomainMetrics(domainId);

	let numberOfBids, lastSale, volumeString;

	if (!isLoadingBids && bids) {
		numberOfBids = formatNumber(bids.length || 0).toLocaleString();
	}

	if (!isLoadingMetrics && metrics) {
		lastSale = formatEthers(metrics.lastSale);
		volumeString = formatEthers(metrics.volume.all);
	}

	const paymentTokenLabel = paymentToken?.label ?? '';

	const stats = [
		{
			title: 'Bids',
			value: {
				isLoading: isLoadingBids,
				text: numberOfBids,
			},
		},
		{
			title: `Last Sale ${paymentTokenLabel}`,
			value: {
				isLoading: isLoadingMetrics,
				text: lastSale,
			},
		},
		{
			title: `Volume ${paymentTokenLabel}`,
			value: {
				isLoading: isLoadingMetrics,
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
