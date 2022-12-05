import { ReactNode } from 'react';

import { useActionsData } from './useActionsData';
import { formatEthers } from '../../../lib/util/number';
import { bigNumberToLocaleString } from '@zero-tech/zapp-utils/formatting/big-number';

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
		paymentTokenSymbol,
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
		? bigNumberToLocaleString(buyNowPrice)
		: '-';

	// const bidsButton = getBidsButton(zna, isOwnedByUser, isViewBids);

	// const actions = [
	// 	{
	// 		label: `Buy Now ${paymentTokenSymbol}`,
	// 		value: buyNowPriceString,
	// 		button: <BuyNowButton zna={zna} trigger={'Buy now'} />,
	// 		isVisible: !isBuyNow,
	// 	},
	// 	{
	// 		label: `Buy Now ${paymentTokenSymbol}`,
	// 		value: buyNowPriceString,
	// 		button: <SetBuyNowButton />,
	// 		isVisible: isSetBuyNow,
	// 	},
	// 	{
	// 		label: `Highest Bid ${paymentTokenSymbol}`,
	// 		value: highestBidString,
	// 		button: bidsButton,
	// 		isVisible: false,
	// 		// isDomainBiddable || isViewBids,
	// 	},
	// 	{
	// 		label: `Your Bid ${paymentTokenSymbol}`,
	// 		value: highestUserBidString,
	// 		button: <CancelBidButton zna={zna} />,
	// 		isVisible: isUserBid,
	// 	},
	// ];

	// const orderedActions = isOwnedByUser
	// 	? [actions[2], actions[0], actions[1]]
	// 	: [actions[0], actions[2], actions[3]];

	return (
		<>
			<ul className={styles.Container}>
				{/* OFFER */}
				{isDomainBiddable && (
					<li className={styles.Item} key={`action-make-offer`}>
						<Action
							label={`Highest Offer ${paymentTokenSymbol}`}
							tokenValue={highestBidString}
							fiatValue={
								Boolean(highestBidString) ? 'No offers yet' : 'No offers yet'
							}
							button={<PlaceBidButton zna={zna} trigger={'Make offer'} />}
							isLoading={!isLoading}
						/>

						{isUserBid && (
							<div className={styles.SubAction2}>
								<span className={styles.Subtext}>
									{`Your highest offer: ${highestUserBidString} ${paymentTokenSymbol}`}
								</span>
								<CancelBidButton
									zna={zna}
									trigger={'Cancel offer'}
									variant={'text'}
								/>
							</div>
						)}
					</li>
				)}

				{/* BUY NOW */}
				{/* {isBuyNow && (
					<li className={styles.Item} key={`action-buy-now`}>
						<Action
							label={`Buy Now ${paymentTokenSymbol}`}
							tokenValue={buyNowPriceString}
							fiatValue={'-'}
							button={<BuyNowButton zna={zna} trigger={'Buy now'} />}
							isLoading={!isLoading}
						/>

						{isDomainBiddable && isUserBid && (
							<PlaceBidButton
								zna={zna}
								variant={'text'}
								trigger={'Or make an offer'}
							/>
						)}
					</li>
				)} */}

				{/* SET BUY NOW */}
				{/* {!isSetBuyNow && (
					<li className={styles.Item} key={`action-set-buy-now`}>
						<Action
							label={`Buy Now ${paymentTokenSymbol}`}
							tokenValue={'-'}
							fiatValue={'Buy now not set'}
							button={<SetBuyNowButton />}
							isLoading={!isLoading}
						/>
					</li>
				)} */}
			</ul>

			{/* {isUserBid && (
				<div className={styles.SubAction}>
					<span className={styles.Subtext}>
						{`Your highest offer: ${highestUserBidString} ${paymentTokenSymbol}`}
					</span>
					<CancelBidButton
						zna={zna}
						trigger={'Cancel offer'}
						variant={'text'}
					/>
				</div>
			)} */}
		</>
	);
};

/***************
 * getBidsButton
 ***************/

// const getBidsButton = (
// 	zna: string,
// 	isOwnedByUser: boolean,
// 	isViewBids: boolean,
// ) =>
// 	!isOwnedByUser ? (
// 		<PlaceBidButton zna={zna} trigger={'Make new offer'} />
// 	) : (
// 		isViewBids && <ViewBidsButton zna={zna} variant="primary" />
// 	);

/*********
 * Action
 *********/

interface ActionProps {
	label: string;
	tokenValue: string;
	fiatValue: string;
	button: ReactNode;
	isLoading: boolean;
}

const Action = ({
	label,
	tokenValue,
	fiatValue,
	button,
	isLoading,
}: ActionProps) => (
	<TextStack
		className={styles.Action}
		label={label}
		primaryText={{
			text: <TextValue tokenValue={tokenValue} fiatValue={fiatValue ?? '-'} />,
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
	tokenValue: string;
	fiatValue: string;
}

const TextValue = ({ tokenValue, fiatValue }: TextValueProps) => (
	<div className={styles.Values}>
		<span className={styles.TokenValue}>{tokenValue}</span>
		<span className={styles.FiatValue}>{fiatValue}</span>
	</div>
);

{
	/* {orderedActions.map(
					(action, index) =>
						action.isVisible && (
							<li key={`action-${index}`}>
								<Action
									label={action.label}
									value={action.value}
									button={action.button}
									isLoading={!isLoading}
								/>
							</li>
						),
				)} */
}
