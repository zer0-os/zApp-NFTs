import { FC, useState } from 'react';

import { useWeb3 } from '../../lib/hooks';
import { useViewBidsData } from './useViewBidsData';
import { formatEthers, sortBidsByTime } from '../../lib/util';
import { truncateAddress } from '@zero-tech/zui';
import { Bid } from '@zero-tech/zauction-sdk';
import moment from 'moment';

import { AcceptBidButton } from '../accept-bid';
import { TextStack, Wizard } from '@zero-tech/zui';

import styles from './ViewBids.module.scss';

export interface ViewBidsProps {
	zna: string;
}

export const ViewBids: FC<ViewBidsProps> = ({ zna }) => {
	const { account } = useWeb3();

	const { bids, isLoadingBids, owner, paymentTokenSymbol } =
		useViewBidsData(zna);

	const [showBidLoader, setShowBidLoader] = useState<boolean>(isLoadingBids);

	const sortedBids = sortBidsByTime(bids);

	const isOwnedByUser = owner?.toLowerCase() === account?.toLowerCase();

	const bidsToShow = isOwnedByUser
		? sortedBids.filter(
				(bid) => bid.bidder.toLowerCase() !== account?.toLowerCase(),
		  )
		: sortedBids;

	// prevent jolt for fast data loading
	setTimeout(() => {
		if (!isLoadingBids) {
			setShowBidLoader(false);
		}
	}, 500);

	return (
		<Wizard.Container className={styles.Container}>
			<Header />

			{/* Loading bids needs to be handlded prior to mapping each bid */}
			{!showBidLoader ? (
				<>
					{bidsToShow.length === 0 && (
						<div className={styles.Message}>
							{'No bids are available to accept'}
						</div>
					)}
					<BidList
						zna={zna}
						bids={bidsToShow.concat(bidsToShow).concat(bidsToShow)}
						paymentTokenSymbol={paymentTokenSymbol}
						isAcceptBidEnabled={isOwnedByUser}
					/>
				</>
			) : (
				<div className={styles.Loading}>
					<Wizard.Loading message={'Loading Bids...'} />
				</div>
			)}
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
	paymentTokenSymbol: BidListProps['paymentTokenSymbol'];
	isAcceptBidEnabled: BidListProps['isAcceptBidEnabled'];
}

const BidItem = ({
	zna,
	bid,
	paymentTokenSymbol,
	isAcceptBidEnabled,
}: BidItemProps) => {
	const label = moment(Number(bid.timestamp)).fromNow();

	const primaryText = bid?.amount
		? `${formatEthers(bid.amount)} ${paymentTokenSymbol}`
		: '-';

	const secondaryText = bid?.bidder ? `by ${truncateAddress(bid.bidder)}` : '-';

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
	zna: string;
	bids: Bid[];
	paymentTokenSymbol: string;
	isAcceptBidEnabled: boolean;
}

const BidList = ({
	zna,
	bids,
	paymentTokenSymbol,
	isAcceptBidEnabled,
}: BidListProps) => {
	return (
		<ul className={styles.BidList}>
			{bids?.map((bid: Bid) => (
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
