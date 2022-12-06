import { FC } from 'react';

import { useActionsData } from '../../useActionsData';

import { TextValue } from '../TextValue';
import { BuyNowButton } from '../../../../buy-now';
import { PlaceBidButton } from '../../../../place-bid';
import { Button, TextStack } from '@zero-tech/zui/components';

import classNames from 'classnames/bind';
import styles from '../CTAContainer/CTAContainer.module.scss';

const cx = classNames.bind(styles);

export interface UserBuyNowActionProps {
	zna: string;
}

export const UserBuyNowAction: FC<UserBuyNowActionProps> = ({ zna }) => {
	const {
		isDomainBiddable,
		buyNowPriceString,
		paymentTokenSymbol,
		buyNowPriceUsdConversionString,
		isUserBid,
		isLoading,
	} = useActionsData(zna);

	const triggerVariant = isDomainBiddable ? (
		<Button variant={'secondary'}>Buy now</Button>
	) : (
		'Buy now'
	);

	return (
		<div
			className={cx(styles.ActionContainer, {
				isSingleAction: !isDomainBiddable,
			})}
		>
			<TextStack
				className={styles.PrimaryAction}
				label={`Buy now (${paymentTokenSymbol})`}
				primaryText={{
					text: (
						<TextValue
							tokenValue={buyNowPriceString}
							fiatValue={buyNowPriceUsdConversionString}
							isSingleAction={!isDomainBiddable}
						/>
					),
					isLoading: isLoading,
				}}
				secondaryText={{
					text: <BuyNowButton zna={zna} trigger={triggerVariant} />,
					isLoading: isLoading,
				}}
			/>

			{!isUserBid && isDomainBiddable && (
				<PlaceBidButton
					zna={zna}
					variant={'text'}
					trigger={'Or make an offer'}
				/>
			)}
		</div>
	);
};
