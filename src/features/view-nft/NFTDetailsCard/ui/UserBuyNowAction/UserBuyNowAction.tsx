import { FC } from 'react';

import { useActionsData } from '../../useActionsData';
import { bigNumberToLocaleString } from '@zero-tech/zapp-utils/formatting/big-number';

import { BuyNowButton } from '../../../../buy-now';
import { PlaceBidButton } from '../../../../place-bid';
import { TextStack } from '@zero-tech/zui/components';

import styles from './UserBuyNowAction.module.scss';

export interface UserBuyNowActionProps {
	zna: string;
}

export const UserBuyNowAction: FC<UserBuyNowActionProps> = ({ zna }) => {
	const { buyNowPrice, paymentTokenSymbol, isDomainBiddable, isLoading } =
		useActionsData(zna);

	const buyNowPriceString = buyNowPrice
		? bigNumberToLocaleString(buyNowPrice)
		: '-';

	return (
		<div className={styles.Container}>
			<TextStack
				className={styles.PrimaryAction}
				label={`Buy Now ${paymentTokenSymbol}`}
				primaryText={{
					text: <TextValue tokenValue={buyNowPriceString} fiatValue={'-'} />,
					isLoading: !isLoading,
				}}
				secondaryText={{
					text: <BuyNowButton zna={zna} trigger={'Buy now'} />,
					isLoading: !isLoading,
				}}
			/>

			{isDomainBiddable && (
				<PlaceBidButton
					zna={zna}
					variant={'text'}
					trigger={'Or make an offer'}
				/>
			)}
		</div>
	);
};

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
