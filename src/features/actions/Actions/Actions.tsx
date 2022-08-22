//- Library Imports
import { Bid } from '@zero-tech/zns-sdk/lib/zAuction';
import { TokenPriceInfo } from '@zero-tech/zns-sdk';

//- Components Imports
import Button from '@zero-tech/zui/src/components/Button';
import Action from '../../ui/Action/Action';

//- Constants Imports
import { ModalType } from '../../../lib/constants/modals';
import { Titles, Labels, Buttons, DataTestId } from './Actions.constants';

//- Utils Imports
import {
	getButtonVariable,
	getOrderedActions,
	getUsdConversion,
	getVisibleActions,
} from './Actions.utils';
import { formatNumber } from '../../../lib/util/number/number';

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
	onButtonClick: (domainName?: string, type?: ModalType) => void;
};

const actionButton = (
	isTextButton: boolean,
	label: string,
	onClick: () => void,
) => (
	<Button variant={isTextButton ? 'text' : 'primary'} onPress={onClick}>
		{label}
	</Button>
);

const Actions = ({
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
	const isBuyNow =
		Boolean(buyNowPrice) && !isOwnedByUser && Boolean(domainName);
	const isUserBid = !isOwnedByUser && Boolean(highestUserBid);
	const isSetBuyNow = isOwnedByUser && Boolean(domainName);
	const isViewBids =
		isOwnedByUser !== undefined && isBiddable && bidData?.length > 0;

	const actions: { [action in ActionTypes]: ActionBlock } = {
		[ActionTypes.BUY_NOW]: {
			label: `${Titles.BUY_NOW} (${paymentTokenInfo?.name})`,
			amountToken: formatNumber(buyNowPrice),
			amountUsd: getUsdConversion(
				buyNowPrice,
				paymentTokenInfo?.price,
				Labels.NO_BUY_NOW,
			),
			isVisible: isBuyNow,
			dataTestId: DataTestId.BUY_NOW,
			buttonComponent: (isTextButton?: boolean) => (
				<Button
					variant={getButtonVariable(isTextButton)}
					onPress={() => onButtonClick(domainName, ModalType.BUY_NOW)}
				>
					{Buttons.BUY_NOW}
				</Button>
			),
		},
		[ActionTypes.SET_BUY_NOW]: {
			label: `${Titles.BUY_NOW} (${paymentTokenInfo?.name})`,
			amountToken: buyNowPrice ? formatNumber(buyNowPrice) : '-',
			amountUsd: getUsdConversion(
				buyNowPrice,
				paymentTokenInfo?.price,
				Labels.NO_BUY_NOW,
			),
			isVisible: isSetBuyNow,
			dataTestId: DataTestId.SET_BUY_NOW,
			buttonComponent: (isTextButton?: boolean) => (
				<Button
					variant={getButtonVariable(isTextButton)}
					onPress={() => onButtonClick(domainName, ModalType.SET_BUY_NOW)}
				>
					{buyNowPrice ? Buttons.EDIT_BUY_NOW : Buttons.SET_BUY_NOW}
				</Button>
			),
		},
		[ActionTypes.BID]: {
			label: `${Titles.HIGHEST_BID} (${paymentTokenInfo?.name})`,
			amountToken: highestBid > 0 ? highestBid : '-',
			amountUsd: getUsdConversion(
				highestBid,
				paymentTokenInfo?.price,
				Labels.NO_BIDS_PLACED,
			),
			isVisible: isBiddable || isViewBids,
			dataTestId: DataTestId.BID,
			buttonComponent: (isTextButton?: boolean) => {
				if (isOwnedByUser && !isViewBids) return <></>;

				return !isOwnedByUser ? (
					<Button
						variant={getButtonVariable(isTextButton)}
						onPress={() => onButtonClick(domainName, ModalType.PLACE_BID)}
					>
						{Buttons.PLACE_A_BID}
					</Button>
				) : (
					<Button
						variant={getButtonVariable(isTextButton)}
						onPress={() => onButtonClick(domainName, ModalType.VIEW_BIDS)}
					>
						{Buttons.VIEW_ALL_BIDS}
					</Button>
				);
			},
		},
		[ActionTypes.USER_BID]: {
			label: `${Titles.YOUR_BID} (${paymentTokenInfo?.name})`,
			amountToken: highestUserBid ? highestUserBid : '-',
			amountUsd: getUsdConversion(highestBid, paymentTokenInfo?.price),
			isVisible: isUserBid,
			dataTestId: DataTestId.USER_BID,
			buttonComponent: (isTextButton?: boolean) => (
				<Button
					variant={getButtonVariable(isTextButton)}
					onPress={() => onButtonClick(domainName, ModalType.CANCEL_BID)}
				>
					{Buttons.CANCEL_BID}
				</Button>
			),
		},
	};

	const orderedActions = getOrderedActions(isOwnedByUser, actions);
	const visibleActions = getVisibleActions(orderedActions);

	return (
		<ul className={styles.Container}>
			{visibleActions.map((action: ActionBlock, index: number) => (
				<li key={action.dataTestId}>
					<Action
						label={action.label}
						amountToken={action.amountToken}
						amountUsd={action.amountUsd}
						buttonComponent={() => action.buttonComponent(index !== 0)}
					/>
				</li>
			))}
		</ul>
	);
};

export default Actions;
