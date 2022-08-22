//- Library Imports
import { Bid } from '@zero-tech/zns-sdk/lib/zAuction';

//- Components Imports
import { TokenPriceInfo } from '@zero-tech/zns-sdk';
import ActionsList from '../../../features/ui/ActionList/ActionList';
import Button from '@zero-tech/zui/src/components/Button';

//- Constants Imports
import { ModalType } from '../../../lib/constants/modals';

//- Utils Imports
import { formatNumber } from '../../../lib/util/number/number';

//- Types Imports
import { ActionBlock, ACTION_TYPES } from '../../../lib/types/actions';

type ActionsProps = {
	accountId?: string;
	domainName?: string;
	bidData?: Bid[];
	isOwnedByUser: boolean;
	isBiddable: boolean;
	buyNowPrice?: string | number;
	highestBid?: number;
	highestUserBid?: number;
	paymentTokenInfo?: TokenPriceInfo;
	onButtonClick: (domainName?: string, type?: ModalType) => void;
};

export const TEST_ID = {
	CONTAINER: 'actions-container',
	BUY_NOW: 'actions-buy-now',
	SET_BUY_NOW: 'actions-set-buy-now',
	BID: 'actions-bid',
	USER_BID: 'actions-user-bid',
};

const Actions = ({
	accountId,
	domainName,
	bidData,
	isOwnedByUser,
	isBiddable,
	buyNowPrice,
	highestBid,
	highestUserBid,
	paymentTokenInfo,
	onButtonClick,
}: ActionsProps) => {
	//
	// todo: serious tidy up and extraction required
	//
	const isBuyNow =
		Boolean(buyNowPrice) && !isOwnedByUser && Boolean(domainName);
	const isUserBid = !isOwnedByUser && Boolean(highestUserBid);
	const isSetBuyNow = isOwnedByUser && Boolean(domainName);
	const isViewBids =
		isOwnedByUser !== undefined && isBiddable && bidData?.length > 0;

	const actions: { [action in ACTION_TYPES]: ActionBlock } = {
		[ACTION_TYPES.BuyNow]: {
			label: `Buy Now (${paymentTokenInfo?.name})`,
			amountToken: formatNumber(buyNowPrice),
			amountUsd:
				buyNowPrice && paymentTokenInfo?.price
					? `$${formatNumber(Number(buyNowPrice) * paymentTokenInfo.price)}`
					: 'No buy now set',
			isVisible: isBuyNow,
			dataTestId: TEST_ID.BUY_NOW,
			buttonComponent: (isTextButton?: boolean) => (
				<Button
					variant={isTextButton ? 'text' : 'primary'}
					onPress={() =>
						onButtonClick(
							domainName,
							accountId ? ModalType.BUY_NOW : ModalType.CONNECT_WALLET_PROMPT,
						)
					}
				>
					Buy Now
				</Button>
			),
		},
		[ACTION_TYPES.SetBuyNow]: {
			label: `Set Buy Now (${paymentTokenInfo?.name})`,
			amountToken: buyNowPrice ? formatNumber(buyNowPrice) : '-',
			amountUsd:
				buyNowPrice && paymentTokenInfo?.price
					? `$${formatNumber(Number(buyNowPrice) * paymentTokenInfo.price)}`
					: 'No buy now set',
			isVisible: isSetBuyNow,
			dataTestId: TEST_ID.SET_BUY_NOW,
			buttonComponent: (isTextButton?: boolean) => (
				<Button
					variant={isTextButton ? 'text' : 'primary'}
					onPress={() =>
						onButtonClick(
							domainName,
							accountId
								? ModalType.SET_BUY_NOW
								: ModalType.CONNECT_WALLET_PROMPT,
						)
					}
				>
					{buyNowPrice ? 'Edit Buy Now' : 'Set Buy Now'}
				</Button>
			),
		},
		[ACTION_TYPES.Bid]: {
			label: `Highest Bid (${paymentTokenInfo?.name})`,
			amountToken: highestBid > 0 ? highestBid : '-',
			amountUsd:
				highestBid > 0 && paymentTokenInfo?.price
					? `$${formatNumber(highestBid * paymentTokenInfo.price)}`
					: 'No bids placed',
			isVisible: isBiddable || isViewBids,
			dataTestId: TEST_ID.BID,
			buttonComponent: (isTextButton?: boolean) => {
				if (isOwnedByUser && !isViewBids) return <></>;

				return !isOwnedByUser ? (
					<Button
						variant={isTextButton ? 'text' : 'primary'}
						onPress={() =>
							onButtonClick(
								domainName,
								accountId
									? ModalType.PLACE_BID
									: ModalType.CONNECT_WALLET_PROMPT,
							)
						}
					>
						Place A Bid
					</Button>
				) : (
					<Button
						variant={isTextButton ? 'text' : 'primary'}
						onPress={() =>
							onButtonClick(
								domainName,
								accountId
									? ModalType.VIEW_BIDS
									: ModalType.CONNECT_WALLET_PROMPT,
							)
						}
					>
						View Bids
					</Button>
				);
			},
		},
		[ACTION_TYPES.UserBid]: {
			label: `Your Bid (${paymentTokenInfo?.name})`,
			amountToken: highestUserBid ? highestUserBid : '-',
			amountUsd:
				highestUserBid && paymentTokenInfo?.price
					? `$${formatNumber(Number(highestUserBid) * paymentTokenInfo.price)}`
					: '',
			isVisible: isUserBid,
			dataTestId: TEST_ID.USER_BID,
			buttonComponent: (isTextButton?: boolean) => (
				<Button
					variant={isTextButton ? 'text' : 'primary'}
					onPress={() =>
						onButtonClick(
							domainName,
							accountId
								? ModalType.CANCEL_BID
								: ModalType.CONNECT_WALLET_PROMPT,
						)
					}
				>
					Cancel Bid
				</Button>
			),
		},
	};

	const orderedActions = isOwnedByUser
		? [
				actions[ACTION_TYPES.Bid],
				actions[ACTION_TYPES.BuyNow],
				actions[ACTION_TYPES.SetBuyNow],
		  ]
		: [
				actions[ACTION_TYPES.BuyNow],
				actions[ACTION_TYPES.Bid],
				actions[ACTION_TYPES.UserBid],
		  ];

	const visibleActions = orderedActions.filter((action: ActionBlock) =>
		Boolean(action.isVisible),
	);

	return <ActionsList actions={visibleActions} />;
};

export default Actions;
