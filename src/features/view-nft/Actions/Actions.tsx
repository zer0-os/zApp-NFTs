import { Action } from '..';
import { BuyNowButton } from '../../buy-now';
import { SetBuyNowButton } from '../../set-buy-now';
import { PlaceBidButton } from '../../place-bid';
import { ViewBidsButton } from '../../view-bids';
import { CancelBidButton } from '../../cancel-bid';

import { useWeb3 } from '../../../lib/hooks/useWeb3';
import { useBuyNowPrice } from '../../../lib/hooks/useBuyNowPrice';
import { useBidData } from '../../../lib/hooks/useBidData';
import { useDomainMetrics } from '../../../lib/hooks/useDomainMetrics';
import { formatEthers, formatNumber } from '../../../lib/util/number/number';
import { getUserBids } from '../../../lib/util/bids/bids';
import { Metadata } from '../../../lib/types/metadata';
import { Labels } from '../../../lib/constants/labels';
import { Domain } from '@zero-tech/zns-sdk';

import { DataTestId } from './Actions.constants';
import { ActionBlock, ActionTypes } from './Actions.types';
import { getOrderedActions, getVisibleActions } from './Actions.utils';

import styles from './Actions.module.scss';

type ActionsProps = {
	domain?: Domain;
	domainMetadata?: Metadata;
};

export const Actions = ({ domain, domainMetadata }: ActionsProps) => {
	const { account } = useWeb3();
	const { data: buyNowPriceData } = useBuyNowPrice(domain?.id);
	const { data: metrics } = useDomainMetrics(domain?.id);
	const { data: bids } = useBidData(domain?.id);

	const buyNowPrice = buyNowPriceData ? formatNumber(buyNowPriceData) : '-';
	const userBids = getUserBids(account, bids) ?? [];
	const highestUserBid =
		userBids.length > 0 ? formatEthers(userBids[0]?.amount) : '-';
	const highestBid =
		metrics?.highestBid > '0' ? formatEthers(metrics?.highestBid) : '-';

	const isOwnedByUser = domain?.owner?.toLowerCase() === account?.toLowerCase();
	const isBiddable = !isOwnedByUser || Boolean(domainMetadata?.isBiddable);
	const isUserBid = !isOwnedByUser && userBids.length > 0;
	const isSetBuyNow = isOwnedByUser && Boolean(domain?.name);
	const isBuyNow =
		Boolean(buyNowPriceData) && !isOwnedByUser && Boolean(domain?.name);
	const isViewBids =
		isOwnedByUser !== undefined && isBiddable && bids?.length > 0;

	const actions: { [action in ActionTypes]: ActionBlock } = {
		[ActionTypes.BUY_NOW]: {
			label: `${Labels.BUY_NOW}`,
			amountToken: buyNowPrice,
			isVisible: isBuyNow,
			dataTestId: DataTestId.BUY_NOW,
			buttonComponent: <BuyNowButton />,
		},
		[ActionTypes.SET_BUY_NOW]: {
			label: `${Labels.BUY_NOW}`,
			amountToken: buyNowPrice,
			isVisible: isSetBuyNow,
			dataTestId: DataTestId.SET_BUY_NOW,
			buttonComponent: <SetBuyNowButton />,
		},
		[ActionTypes.BID]: {
			label: `${Labels.HIGHEST_BID}`,
			amountToken: highestBid,
			isVisible: isBiddable || isViewBids,
			dataTestId: DataTestId.BID,
			buttonComponent: !isOwnedByUser ? (
				<PlaceBidButton />
			) : !isViewBids ? (
				<></>
			) : (
				<ViewBidsButton />
			),
		},
		[ActionTypes.USER_BID]: {
			label: `${Labels.YOUR_BID}`,
			amountToken: highestUserBid,
			isVisible: isUserBid,
			dataTestId: DataTestId.USER_BID,
			buttonComponent: <CancelBidButton />,
		},
	};

	const orderedActions = getOrderedActions(isOwnedByUser, actions);
	const visibleActions = getVisibleActions(orderedActions);

	return (
		<ul className={styles.Container}>
			{visibleActions.map((action: ActionBlock) => (
				<li key={action.dataTestId}>
					<Action
						label={action.label}
						amountToken={action.amountToken}
						amountUsd={action.amountUsd}
						buttonComponent={action.buttonComponent}
					/>
				</li>
			))}
		</ul>
	);
};
