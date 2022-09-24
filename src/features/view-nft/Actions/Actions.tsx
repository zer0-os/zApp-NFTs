import { Domain, TokenPriceInfo } from '@zero-tech/zns-sdk';

import { Action } from '..';
import { BuyNowButton } from '../../buy-now';
import { SetBuyNowButton } from '../../set-buy-now';
import { PlaceBidButton } from '../../place-bid';
import { ViewBidsButton } from '../../view-bids';
import { CancelBidButton } from '../../cancel-bid';

import { DataTestId, Messages } from './Actions.constants';
import { Labels } from '../../../lib/constants/labels';

import { useWeb3 } from '../../../lib/hooks/useWeb3';
import { useBuyNowPrice } from '../../../lib/hooks/useBuyNowPrice';
import { useBidData } from '../../../lib/hooks/useBidData';

import {
	getOrderedActions,
	getUsdConversion,
	getVisibleActions,
} from './Actions.utils';
import { formatNumber } from '../../../lib/util/number/number';
import { getHighestBid, getUserBids } from '../../../lib/util/bids/bids';

import { ActionBlock, ActionTypes } from './Actions.types';
import { Metadata } from '../../../lib/types/metadata';

import styles from './Actions.module.scss';

type ActionsProps = {
	domain?: Domain;
	domainMetadata?: Metadata;
	paymentTokenInfo?: TokenPriceInfo;
};

export const Actions = ({
	domain,
	domainMetadata,
	paymentTokenInfo,
}: ActionsProps) => {
	const { account } = useWeb3();
	const { data: buyNowPrice } = useBuyNowPrice(domain?.id);
	const { data: bids } = useBidData(domain?.id);
	const userBids = getUserBids(account, bids);
	const highestBid = getHighestBid(bids);
	const highestUserBid = getHighestBid(userBids);
	const isOwnedByUser = domain?.owner?.toLowerCase() === account?.toLowerCase();
	const isBiddable = !isOwnedByUser || Boolean(domainMetadata?.isBiddable);
	const isUserBid = !isOwnedByUser && Boolean(highestUserBid);
	const isSetBuyNow = isOwnedByUser && Boolean(domain?.name);
	const isBuyNow =
		Boolean(buyNowPrice) && !isOwnedByUser && Boolean(domain?.name);
	const isViewBids =
		isOwnedByUser !== undefined && isBiddable && bids?.length > 0;

	const actions: { [action in ActionTypes]: ActionBlock } = {
		[ActionTypes.BUY_NOW]: {
			label: `${Labels.BUY_NOW} (${paymentTokenInfo?.name})`,
			amountToken: formatNumber(buyNowPrice),
			amountUsd: getUsdConversion(
				buyNowPrice,
				paymentTokenInfo?.price,
				Messages.NO_BUY_NOW,
			),
			isVisible: isBuyNow,
			dataTestId: DataTestId.BUY_NOW,
			buttonComponent: <BuyNowButton />,
		},
		[ActionTypes.SET_BUY_NOW]: {
			label: `${Labels.BUY_NOW} (${paymentTokenInfo?.name})`,
			amountToken: buyNowPrice ? formatNumber(buyNowPrice) : '-',
			amountUsd: getUsdConversion(
				buyNowPrice,
				paymentTokenInfo?.price,
				Messages.NO_BUY_NOW,
			),
			isVisible: isSetBuyNow,
			dataTestId: DataTestId.SET_BUY_NOW,
			buttonComponent: <SetBuyNowButton />,
		},
		[ActionTypes.BID]: {
			label: `${Labels.HIGHEST_BID} (${paymentTokenInfo?.name})`,
			amountToken: highestBid > 0 ? highestBid : '-',
			amountUsd: getUsdConversion(
				highestBid,
				paymentTokenInfo?.price,
				Messages.NO_BIDS_PLACED,
			),
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
			label: `${Labels.YOUR_BID} (${paymentTokenInfo?.name})`,
			amountToken: highestUserBid ? highestUserBid : '-',
			amountUsd: getUsdConversion(highestBid, paymentTokenInfo?.price),
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
