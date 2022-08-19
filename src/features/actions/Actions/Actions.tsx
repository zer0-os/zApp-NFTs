//- Library Imports
import { ethers } from 'ethers';
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
	domainName?: string;
	bidData?: Bid[];
	isOwnedByUser: boolean;
	isBiddable: boolean;
	highestBid?: number;
	paymentTokenInfo?: TokenPriceInfo;
	onButtonClick: (domainName?: string, type?: ModalType) => void;
};

export const TEST_ID = {
	CONTAINER: 'actions-container',
	BUY_NOW: 'actions-buy-now',
	SET_BUY_NOW: 'actions-set-buy-now',
	BID: 'actions-bid',
	YOUR_BID: 'actions-your-bid',
};

const Actions = ({
	domainName,
	bidData,
	isOwnedByUser,
	isBiddable,
	highestBid,
	paymentTokenInfo,
	onButtonClick,
}: ActionsProps) => {
	const isViewBids =
		isOwnedByUser !== undefined && isBiddable && bidData?.length > 0;

	// todo: serious tidy up required
	const actions: { [action in ACTION_TYPES]: ActionBlock } = {
		[ACTION_TYPES.Bid]: {
			label: `Highest Bid (${paymentTokenInfo?.name})`,
			amountToken: highestBid > 0 ? highestBid : '-',
			amountUsd:
				highestBid > 0 && paymentTokenInfo?.price
					? `$${formatNumber(highestBid * paymentTokenInfo.price)}`
					: 'No bids placed',
			isVisible: isBiddable || isViewBids,
			dataTestId: TEST_ID.BID,
			buttonComponent: () => {
				if (isOwnedByUser && !isViewBids) return <></>;

				return !isOwnedByUser ? (
					<Button
						onPress={() => onButtonClick(domainName, ModalType.PLACE_BID)}
					>
						Place A Bid
					</Button>
				) : (
					<Button
						onPress={() => onButtonClick(domainName, ModalType.VIEW_BIDS)}
					>
						View Bids
					</Button>
				);
			},
		},
	};

	const orderedActions = isOwnedByUser
		? [
				actions[ACTION_TYPES.Bid],
				// actions[ACTION_TYPES.BuyNow],
				// actions[ACTION_TYPES.SetBuyNow],
		  ]
		: [
				// actions[ACTION_TYPES.BuyNow],
				actions[ACTION_TYPES.Bid],
				// actions[ACTION_TYPES.YourBid],
		  ];

	const visibleActions = orderedActions.filter((action: ActionBlock) =>
		Boolean(action.isVisible),
	);

	return <ActionsList actions={visibleActions} />;
};

export default Actions;
