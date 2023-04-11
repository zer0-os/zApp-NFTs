import { FC } from 'react';

import { usePaymentToken, useSubdomainDataByIdDeep } from '../../../lib/hooks';
import { formatEthers, formatNumber, getDomainId } from '../../../lib/util';

import { StatsList } from '../../ui';

interface SubdomainMetricsProps {
	zna: string;
}

export const SubdomainMetrics: FC<SubdomainMetricsProps> = ({ zna }) => {
	const domainId = getDomainId(zna);

	const { data: subdomains, isLoading: isLoadingSubdomains } =
		useSubdomainDataByIdDeep(domainId, 99999, { 'buyNow.price': 'asc' });

	const { data: paymentToken } = usePaymentToken(zna);

	const paymentTokenLabel = paymentToken?.symbol
		? ` (${paymentToken?.symbol})`
		: '';

	const itemsInDomain =
		subdomains?.length !== undefined ? formatNumber(subdomains?.length) : '-';

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
				text: itemsInDomain,
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

	return <StatsList stats={stats} />;
};
