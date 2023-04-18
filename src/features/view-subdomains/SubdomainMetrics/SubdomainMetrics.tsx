import { FC } from 'react';

import { useDomainMetrics, usePaymentToken } from '../../../lib/hooks';
import { formatEthers, formatNumber, getDomainId } from '../../../lib/util';

import { StatsList } from '../../ui';

import styles from './SubdomainMetrics.module.scss';

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
		metrics?.items !== undefined ? formatNumber(metrics?.items) : '-';

	const floorPriceString = metrics?.lowestSale
		? formatEthers(metrics?.lowestSale)
		: '-';

	const volumeString = metrics?.volume?.all
		? formatEthers(metrics?.volume?.all)
		: '-';

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

	return <StatsList className={styles.Stats} stats={stats} />;
};
