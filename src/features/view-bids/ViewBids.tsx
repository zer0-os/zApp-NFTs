import { FC } from 'react';

import { formatEthers, getDomainId } from '../../lib/util';
import { useWeb3 } from '../../lib/hooks/useWeb3';
import { useBidData } from '../../lib/hooks/useBidData';
import { sortBidsByTime } from '../../lib/util/bids/bids';
import { Bid } from '@zero-tech/zauction-sdk';

import { AcceptBidButton } from '../../features/accept-bid';
import { Wizard } from '@zero-tech/zui/components';

import styles from './ViewBids.module.scss';

export interface ViewBidsProps {
	zna: string;
}

export const ViewBids: FC<ViewBidsProps> = ({ zna }) => {
	const { account } = useWeb3();

	const domainId = getDomainId(zna);

	const { data: bids } = useBidData(domainId);

	const sortedBids = sortBidsByTime(bids);

	const bidsToShow = sortedBids.filter(
		(bid) => bid.bidder.toLowerCase() !== account?.toLowerCase(),
	);

	return (
		<Wizard.Container header="All Bids">
			<ul className={styles.Container}>
				{bidsToShow.map((bid: Bid) => (
					<li key={bid.bidNonce} className={styles.Bid}>
						{formatEthers(bid.amount)}
						<AcceptBidButton zna={zna} bid={bid} />
					</li>
				))}
			</ul>
		</Wizard.Container>
	);
};
