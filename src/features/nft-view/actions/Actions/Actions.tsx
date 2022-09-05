//- Library Imports
import { Bid } from '@zero-tech/zns-sdk/lib/zAuction';
import { TokenPriceInfo } from '@zero-tech/zns-sdk';

//- Components Imports
import Action from '../Action/Action';
import { BuyNowButton } from '../../../../features/buy-now';
import { SetBuyNowButton } from '../../../../features/set-buy-now';
import { PlaceBidButton } from '../../../../features/place-bid';
import { ViewBidsButton } from '../../../../features/view-bids';
import { CancelBidButton } from '../../../../features/cancel-bid';

//- Constants Imports
import { DataTestId, Messages } from './Actions.constants';
import { Labels } from '../../../../lib/constants/labels';

//- Utils Imports
import {
	getOrderedActions,
	getUsdConversion,
	getVisibleActions,
} from './Actions.utils';
import { formatNumber } from '../../../../lib/util/number/number';

//- Types Imports
import { ActionBlock, ActionTypes } from './Actions.types';

// Styles
import styles from './Actions.module.scss';

type ActionsProps = {
	domainName?: string;
	bidData?: Bid[];
	isOwnedByUser: boolean;
	isBiddable: boolean;
	buyNowPrice?: string | number;
	highestBid?: number;
	highestUserBid?: number;
	paymentTokenInfo?: TokenPriceInfo;
};

const Actions = ({
	domainName,
	bidData,
	isOwnedByUser,
	isBiddable,
	buyNowPrice,
	highestBid,
	highestUserBid,
	paymentTokenInfo,
}: ActionsProps) => {
	const isBuyNow =
		Boolean(buyNowPrice) && !isOwnedByUser && Boolean(domainName);
	const isUserBid = !isOwnedByUser && Boolean(highestUserBid);
	const isSetBuyNow = isOwnedByUser && Boolean(domainName);
	const isViewBids =
		isOwnedByUser !== undefined && isBiddable && bidData?.length > 0;

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

export default Actions;
