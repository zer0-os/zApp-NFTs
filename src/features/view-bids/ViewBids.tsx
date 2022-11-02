import { FC } from 'react';

import { useWeb3 } from '../../lib/hooks/useWeb3';
import { useViewBidsData } from './useViewBidsData';
import { sortBidsByTime } from '../../lib/util/bids/bids';
import { formatEthers } from '../../lib/util';
import { truncateAddress } from '@zero-tech/zapp-utils/formatting/addresses';
import { Bid } from '@zero-tech/zauction-sdk';
import moment from 'moment';

import {
	AcceptBidButton,
	AcceptBidButtonProps,
} from '../../features/accept-bid';
import { TextStack, TextStackProps, Wizard } from '@zero-tech/zui/components';

import styles from './ViewBids.module.scss';

export interface ViewBidsProps {
	zna: BidListProps['zna'];
}

export const ViewBids: FC<ViewBidsProps> = ({ zna }) => {
	const { account } = useWeb3();
	const { bids, owner, paymentTokenSymbol } = useViewBidsData(zna);

	const sortedBids = sortBidsByTime(bids);

	const isOwnedByUser: BidListProps['isAcceptBidEnabled'] =
		owner?.toLowerCase() !== account?.toLowerCase();

	const bidsToShow: BidListProps['bids'] = isOwnedByUser
		? sortedBids.filter(
				(bid) => bid.bidder.toLowerCase() !== account?.toLowerCase(),
		  )
		: sortedBids;

	return (
		<Wizard.Container className={styles.Container}>
			<Header />
			<BidList
				zna={zna}
				bids={bidsToShow}
				isAcceptBidEnabled={isOwnedByUser}
				paymentTokenSymbol={paymentTokenSymbol}
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
	zna: AcceptBidButtonProps['zna'];
	bid: Bid;
	isAcceptBidEnabled: boolean;
	paymentTokenSymbol: string;
}

const BidItem = ({
	zna,
	bid,
	isAcceptBidEnabled,
	paymentTokenSymbol,
}: BidItemProps) => {
	const label: TextStackProps['label'] = moment(
		Number(bid.timestamp),
	).fromNow();

	const primaryText: TextStackProps['primaryText'] = `${formatEthers(
		bid.amount,
	)}  ${paymentTokenSymbol}`;

	const secondaryText: TextStackProps['secondaryText'] = `by ${truncateAddress(
		bid.bidder,
	)}`;

	return (
		<div className={styles.BidContent}>
			<TextStack
				className={styles.TextContent}
				label={label}
				primaryText={primaryText}
				secondaryText={secondaryText}
			/>
			{isAcceptBidEnabled && <AcceptBidButton zna={zna} bid={bid} />}
		</div>
	);
};

/*******************
 * BidList
 *******************/

interface BidListProps {
	zna: BidItemProps['zna'];
	bids: BidItemProps['bid'][];
	isAcceptBidEnabled: BidItemProps['isAcceptBidEnabled'];
	paymentTokenSymbol: BidItemProps['paymentTokenSymbol'];
}

const BidList = ({
	zna,
	bids,
	isAcceptBidEnabled,
	paymentTokenSymbol,
}: BidListProps) => {
	return (
		<ul className={styles.BidList}>
			{bids.map((bid: Bid) => (
				<li key={bid.bidNonce} className={styles.BidItem}>
					<BidItem
						zna={zna}
						bid={bid}
						isAcceptBidEnabled={isAcceptBidEnabled}
						paymentTokenSymbol={paymentTokenSymbol}
					/>
				</li>
			))}
		</ul>
	);
};
