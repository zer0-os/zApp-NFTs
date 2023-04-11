import { FC } from 'react';

import {
	useBidData,
	usePaymentToken,
	useDomainMetrics,
} from '../../../lib/hooks';
import {
	formatEthers,
	formatNumber,
	getDomainId,
	getParentZna,
} from '../../../lib/util';

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

	const numberOfBids =
		bids?.length !== 0 ? formatNumber(bids?.length).toLocaleString() : '0';

	const lastSale = metrics?.lastSale ? formatEthers(metrics?.lastSale) : '-';

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
	];

	return <StatsList stats={stats} />;
};
