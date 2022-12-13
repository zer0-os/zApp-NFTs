import { FC } from 'react';

import { useActionsData } from '../../useActionsData';

import {
	OwnerOfferAction,
	OwnerSetBuyNowAction,
	UserBuyNowAction,
	UserCancelOffer,
	UserOfferAction,
} from '..';

import classNames from 'classnames/bind';
import styles from './ActionContainer.module.scss';

const cx = classNames.bind(styles);

export interface ActionContainerProps {
	zna: string;
}

export const ActionContainer: FC<ActionContainerProps> = ({ zna }) => {
	const { isDomainBiddable, isBuyNow, isUserBid, isOwnedByUser } =
		useActionsData(zna);

	const isSingleAction =
		(!isBuyNow && isDomainBiddable) || (isBuyNow && !isDomainBiddable);

	return (
		<div
			className={cx(styles.ActionContainer, {
				isSingleAction: isSingleAction,
			})}
		>
			{/* Make offer */}
			{(isDomainBiddable || !isBuyNow || isUserBid) && (
				<UserOfferAction zna={zna} />
			)}

			{/* Buy now */}
			{isBuyNow && <UserBuyNowAction zna={zna} />}

			{/* View bids / Enable bids now && Set buy now / Edit buy now */}
			{isOwnedByUser && (
				<>
					<OwnerOfferAction zna={zna} />
					<OwnerSetBuyNowAction zna={zna} />
				</>
			)}

			{/* TODO: add styling to handle cancel offer with multiple actions */}
			{/* {!isSingleAction && !isUserBid && <UserCancelOffer zna={zna} />} */}
		</div>
	);
};
