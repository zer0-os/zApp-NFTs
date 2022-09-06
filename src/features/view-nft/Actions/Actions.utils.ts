//- Types Imports
import { ActionBlock, ActionTypes } from './Actions.types';

//- Utils Imports
import { formatNumber } from '../../../lib/util/number/number';

// const actions = {
// 	owner: [ActionTypes.BID, ActionTypes.BUY_NOW, ActionTypes.SET_BUY_NOW],
// 	viewer: [ActionTypes.BUY_NOW, ActionTypes.BID, ActionTypes.USER_BID],
// };

// export const getOrderedActions = (isOwnedByUser: boolean) =>
// 	isOwnedByUser ? actions['owner'] : actions['viewer'];

// export const getVisibleActions = (actions: ActionBlock[]) =>
// 	actions.filter((action) => Boolean(action.isVisible));

export const getOrderedActions = (
	isOwnedByUser: boolean,
	actions: { [action in ActionTypes]: ActionBlock },
) =>
	isOwnedByUser
		? [
				actions[ActionTypes.BID],
				actions[ActionTypes.BUY_NOW],
				actions[ActionTypes.SET_BUY_NOW],
		  ]
		: [
				actions[ActionTypes.BUY_NOW],
				actions[ActionTypes.BID],
				actions[ActionTypes.USER_BID],
		  ];

export const getVisibleActions = (actions: ActionBlock[]) =>
	actions.filter((action) => Boolean(action.isVisible));

export const getUsdConversion = (
	tokenTotal: number | string,
	paymentTokenPrice: number,
	text?: string,
) =>
	tokenTotal && paymentTokenPrice
		? `$${formatNumber(Number(tokenTotal) * paymentTokenPrice)}`
		: text;

export const getButtonVariable = (isTextButton: boolean) =>
	isTextButton ? 'text' : 'primary';
