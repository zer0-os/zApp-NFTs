import { ReactNode } from 'react';

import { useActionsData } from './useActionsData';
import { formatEthers } from '../../../lib/util/number';

import { BuyNowButton } from '../../buy-now';
import { SetBuyNowButton } from '../../set-buy-now';
import { PlaceBidButton } from '../../place-bid';
import { ViewBidsButton } from '../../view-bids';
import { CancelBidButton } from '../../cancel-bid';
import { TextStack } from '@zero-tech/zui/components';

import styles from './Actions.module.scss';

interface ActionsProps {
	zna: string;
}

export const Actions = ({ zna }: ActionsProps) => {
	const {
		highestBid,
		highestUserBid,
		buyNowPrice,
		paymentTokenLabel,
		isDomainBiddable,
		isOwnedByUser,
		isSetBuyNow,
		isUserBid,
		isBuyNow,
		isViewBids,
		isLoading,
	} = useActionsData(zna);

	const highestBidString = highestBid ? formatEthers(highestBid?.amount) : '-';

	const highestUserBidString = highestUserBid
		? formatEthers(highestUserBid?.amount)
		: '-';

	const buyNowPriceString = buyNowPrice
		? formatEthers(buyNowPrice?.toString())
		: '-';

	const bidsButton = getBidsButton(zna, isOwnedByUser, isViewBids);

	const actions = [
		{
			label: `Buy Now ${paymentTokenLabel}`,
			value: buyNowPriceString,
			button: <BuyNowButton />,
			isVisible: isBuyNow,
		},
		{
			label: `Buy Now ${paymentTokenLabel}`,
			value: buyNowPriceString,
			button: <SetBuyNowButton />,
			isVisible: isSetBuyNow,
		},
		{
			label: `Highest Bid ${paymentTokenLabel}`,
			value: highestBidString,
			button: bidsButton,
			isVisible: isDomainBiddable || isViewBids,
		},
		{
			label: `Your Bid ${paymentTokenLabel}`,
			value: highestUserBidString,
			button: <CancelBidButton zna={zna} />,
			isVisible: isUserBid,
		},
	];

	const orderedActions = isOwnedByUser
		? [actions[2], actions[0], actions[1]]
		: [actions[0], actions[2], actions[3]];

	return (
		<ul className={styles.Container}>
			{orderedActions.map(
				(action, index) =>
					action.isVisible && (
						<li key={`action-${index}`}>
							<Action
								label={action.label}
								value={action.value}
								button={action.button}
								isLoading={isLoading}
							/>
						</li>
					),
			)}
		</ul>
	);
};

/***************
 * getBidsButton
 ***************/

const getBidsButton = (
	zna: string,
	isOwnedByUser: boolean,
	isViewBids: boolean,
) =>
	!isOwnedByUser ? (
		<PlaceBidButton zna={zna} trigger={'Place A Bid'} />
	) : (
		isViewBids && <ViewBidsButton zna={zna} variant="primary" />
	);

/*********
 * Action
 *********/

interface ActionProps {
	label: string;
	value: string;
	button: ReactNode;
	isLoading: boolean;
}

const Action = ({ label, value, button, isLoading }: ActionProps) => (
	<TextStack
		className={styles.Action}
		label={label}
		primaryText={{
			text: <TextValue value={value} />,
			isLoading: isLoading,
		}}
		secondaryText={{
			text: button,
			isLoading: isLoading,
		}}
	/>
);

/************
 * TextValue
 ************/

interface TextValueProps {
	value: string;
}

const TextValue = ({ value }: TextValueProps) => (
	<span className={styles.Value}>{value}</span>
);
