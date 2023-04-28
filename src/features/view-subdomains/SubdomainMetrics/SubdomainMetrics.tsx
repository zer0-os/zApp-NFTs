import { FC } from 'react';
import { useQueryClient } from 'react-query';

import { usePaymentToken, useSubdomainDataByIdDeep } from '../../../lib/hooks';
import { formatEthers, formatNumber, getDomainId } from '../../../lib/util';

import { StatsList } from '../../ui';

import styles from './SubdomainMetrics.module.scss';

interface SubdomainMetricsProps {
	zna: string;
}

type SubdomainMap = Record<string, string>;

export const SubdomainMetrics: FC<SubdomainMetricsProps> = ({ zna }) => {
	const domainId = getDomainId(zna);
	const queryClient = useQueryClient();
	const { data: paymentToken } = usePaymentToken(zna);
	const { data: subdomains, isLoading: isLoadingSubdomains } =
		useSubdomainDataByIdDeep(domainId, { 'buyNow.price': 'asc' });

	// creates map of all subdomain names
	const subdomainMap: SubdomainMap =
		subdomains?.reduce((map, subdomain) => {
			map[subdomain.id] = subdomain.name;
			return map;
		}, {}) || {};

	// caches the map of all subdomain names
	queryClient.setQueryData(['subdomainMap', domainId], subdomainMap);

	// calculates the subdomain count
	const subdomainCount =
		Object.values(subdomainMap).filter((subdomain) =>
			subdomain.startsWith(zna.split('.')[0]),
		).length || 0;

	const paymentTokenLabel = paymentToken?.symbol
		? ` (${paymentToken?.symbol})`
		: '';

	const floorPriceString = subdomains?.find((subdomain) => subdomain.buyNow)
		?.buyNow?.price
		? formatEthers(
				subdomains.find((subdomain) => subdomain.buyNow)?.buyNow?.price,
		  )
		: '-';

	const stats = [
		{
			title: 'Items In Domain',
			value: {
				text: formatNumber(subdomainCount),
				isLoading: isLoadingSubdomains,
			},
		},
		{
			title: 'Floor Price ' + paymentTokenLabel,
			value: {
				text: floorPriceString,
				isLoading: isLoadingSubdomains,
			},
		},
	];

	return <StatsList className={styles.Stats} stats={stats} />;
};
