import { FC } from 'react';

import { useWeb3 } from '../../lib/hooks/useWeb3';
import { useBidData } from '../../lib/hooks/useBidData';
import { sortBidsByTime } from '../../lib/util/bids/bids';
import { getDomainId, formatEthers } from '../../lib/util';
import { usePaymentToken } from '../../lib/hooks/usePaymentToken';
import { truncateAddress } from '@zero-tech/zapp-utils/formatting/addresses';
import { Bid } from '@zero-tech/zauction-sdk';
import moment from 'moment';

import { AcceptBidButton } from '../../features/accept-bid';
import { TextStack, Wizard } from '@zero-tech/zui/components';

import styles from './ViewBids.module.scss';

export interface ViewBidsProps {
	zna: string;
}

export const ViewBids: FC<ViewBidsProps> = ({ zna }) => {
	const domainId = getDomainId(zna);

	const { account } = useWeb3();
	const { data: bids } = useBidData(domainId);
	const { data: paymentToken } = usePaymentToken(zna);

	const sortedBids = sortBidsByTime(bids);

	const bidsToShow = sortedBids.filter(
		(bid) => bid.bidder.toLowerCase() !== account?.toLowerCase(),
	);

	return (
		<Wizard.Container className={styles.Container}>
			<Header />
			<BidList
				zna={zna}
				bids={bidsToShow}
				paymentTokenSymbol={paymentToken?.symbol}
			/>
		</Wizard.Container>
	);
};

/*******************
 * Header
 *******************/

const Header = () => {
	return (
		<div className={styles.Header}>
			<Wizard.Header header={'All Bids'} />
		</div>
	);
};

/*******************
 * BidItem
 *******************/

interface BidItemProps {
	zna: string;
	bid: Bid;
	paymentTokenSymbol: string;
}

const BidItem = ({ zna, bid, paymentTokenSymbol }: BidItemProps) => {
	const label = moment(Number(bid.timestamp)).fromNow();
	const primaryText = `${formatEthers(bid.amount)}  ${paymentTokenSymbol}`;
	const secondaryText = `by ${truncateAddress(bid.bidder)}`;

	return (
		<div className={styles.BidContent}>
			<TextStack
				className={styles.TextContent}
				label={label}
				primaryText={primaryText}
				secondaryText={secondaryText}
			/>
			<AcceptBidButton zna={zna} bid={bid} />
		</div>
	);
};

/*******************
 * BidList
 *******************/

interface BidListProps {
	zna: string;
	bids: Bid[];
	paymentTokenSymbol: string;
}

const BidList = ({ zna, bids, paymentTokenSymbol }: BidListProps) => {
	return (
		<ul className={styles.BidList}>
			{bids.map((bid: Bid) => (
				<li key={bid.bidNonce} className={styles.BidItem}>
					<BidItem
						zna={zna}
						bid={bid}
						paymentTokenSymbol={paymentTokenSymbol}
					/>
				</li>
			))}
		</ul>
	);
};
