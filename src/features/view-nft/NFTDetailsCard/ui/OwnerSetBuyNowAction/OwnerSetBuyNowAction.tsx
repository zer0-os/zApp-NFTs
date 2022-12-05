import { FC } from 'react';

import { useActionsData } from '../../useActionsData';
import { bigNumberToLocaleString } from '@zero-tech/zapp-utils/formatting/big-number';

import { SetBuyNowButton } from '../../../../set-buy-now';
import { TextStack } from '@zero-tech/zui/components';

import styles from './OwnerSetBuyNowAction.module.scss';

export interface OwnerSetBuyNowActionProps {
	zna: string;
}

export const OwnerSetBuyNowAction: FC<OwnerSetBuyNowActionProps> = ({
	zna,
}) => {
	const { buyNowPrice, isSetBuyNow, paymentTokenSymbol, isLoading } =
		useActionsData(zna);

	const buyNowPriceString = buyNowPrice
		? bigNumberToLocaleString(buyNowPrice)
		: '-';

	const fiatValue = isSetBuyNow ? '1,200,000' : 'Buy now not set';

	return (
		<div className={styles.Container}>
			<TextStack
				className={styles.PrimaryAction}
				label={`Buy Now ${paymentTokenSymbol}`}
				primaryText={{
					text: (
						<TextValue tokenValue={buyNowPriceString} fiatValue={fiatValue} />
					),
					isLoading: !isLoading,
				}}
				secondaryText={{
					text: <SetBuyNowButton />,
					isLoading: !isLoading,
				}}
			/>
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
