import { FC } from 'react';

import { useActionsData } from '../../useActionsData';

import { TextValue } from '../TextValue';
import { SetBuyNowButton } from '../../../../set-buy-now';
import { Button, TextStack } from '@zero-tech/zui/components';

import styles from '../ActionContainer/ActionContainer.module.scss';

export interface OwnerSetBuyNowActionProps {
	zna: string;
}

export const OwnerSetBuyNowAction: FC<OwnerSetBuyNowActionProps> = ({
	zna,
}) => {
	const {
		buyNowPriceString,
		isSetBuyNow,
		isViewBids,
		paymentTokenSymbol,
		buyNowPriceUsdConversionString,
		isLoading,
	} = useActionsData(zna);

	const fiatValue = isSetBuyNow
		? buyNowPriceUsdConversionString
		: 'Buy now not set';

	const buttonLabel = isSetBuyNow ? 'Edit buy now' : 'Set buy now';

	const triggerVariant = isViewBids ? (
		<Button variant={'secondary'}>{buttonLabel}</Button>
	) : (
		buttonLabel
	);

	return (
		<div className={styles.ActionContent}>
			<TextStack
				className={styles.PrimaryAction}
				label={`Buy now (${paymentTokenSymbol})`}
				primaryText={{
					text: (
						<TextValue tokenValue={buyNowPriceString} fiatValue={fiatValue} />
					),
					isLoading: isLoading,
				}}
				secondaryText={{
					text: <SetBuyNowButton trigger={triggerVariant} />,
					isLoading: isLoading,
				}}
			/>
		</div>
	);
};
