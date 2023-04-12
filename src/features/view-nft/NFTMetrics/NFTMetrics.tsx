import { FC } from 'react';

import { useBidData } from '../../../lib/hooks';
import { formatNumber, getDomainId } from '../../../lib/util';

import { StatsList } from '../../ui';

type NFTMetricsProps = {
	zna: string;
};

export const NFTMetrics: FC<NFTMetricsProps> = ({ zna }) => {
	const domainId = getDomainId(zna);

	const { data: bids, isLoading: isLoadingBids } = useBidData(domainId);

	const numberOfBids =
		bids?.length !== 0 ? formatNumber(bids?.length).toLocaleString() : '0';

	const stats = [
		{
			title: 'Bids',
			value: {
				isLoading: isLoadingBids,
				text: numberOfBids,
			},
		},
	];

	return <StatsList stats={stats} />;
};
