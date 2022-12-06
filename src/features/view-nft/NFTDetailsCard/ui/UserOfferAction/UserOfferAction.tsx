import { FC } from 'react';

import { useActionsData } from '../../useActionsData';
import { formatEthers } from '../../../../../lib/util';

import { TextValue } from '../TextValue';
import { UserCancelOffer } from '../UserCancelOffer';
import { PlaceBidButton } from '../../../../place-bid';
import { TextStack } from '@zero-tech/zui/components';

import classNames from 'classnames/bind';
import styles from '../CTAContainer/CTAContainer.module.scss';

const cx = classNames.bind(styles);

export interface UserOfferActionProps {
	zna: string;
}

export const UserOfferAction: FC<UserOfferActionProps> = ({ zna }) => {
	const {
		highestBid,
		highestBidUsdConversionString,
		paymentTokenSymbol,
		isUserBid,
		isBuyNow,
		isLoading,
	} = useActionsData(zna);

	const highestBidString = highestBid ? formatEthers(highestBid?.amount) : '-';

	const fiatValue = Boolean(highestBidString)
		? highestBidUsdConversionString
		: 'No offers yet';

	return (
		<div
			className={cx(styles.ActionContainer, {
				isSingleAction: !isBuyNow,
			})}
		>
			<TextStack
				className={styles.PrimaryAction}
				label={`Highest offer (${paymentTokenSymbol})`}
				primaryText={{
					text: (
						<TextValue
							tokenValue={highestBidString}
							fiatValue={fiatValue}
							isSingleAction={!isBuyNow}
						/>
					),
					isLoading: isLoading,
				}}
				secondaryText={{
					text: (
						<PlaceBidButton
							zna={zna}
							trigger={isUserBid ? 'Make new offer' : 'Make offer'}
						/>
					),
					isLoading: isLoading,
				}}
			/>

			{isUserBid && !isBuyNow && <UserCancelOffer zna={zna} />}
		</div>
	);
};
