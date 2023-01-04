import { FC, useState } from 'react';

import { Step } from '../hooks';
import { formatNumber } from '../../../../../lib/util';
import { useSetBuyNowData } from '../../../useSetBuyNowData';

import { NFTDetails } from '../ui';
import { ToggleButton } from '../../../../ui';
import { Input } from '@zero-tech/zui/components/Input';
import { Wizard, ButtonsProps } from '@zero-tech/zui/components/Wizard';

import styles from '../FormSteps.module.scss';

export interface DetailsProps {
	zna: string;
	step: Step;
	errorText: string;
	buyNowAmount: string;
	setBuyNowAmount: (bid: string) => void;
	onCheckZAuction: () => void;
	onClose: () => void;
}

export const Details: FC<DetailsProps> = ({
	zna,
	step,
	errorText,
	buyNowAmount,
	setBuyNowAmount,
	onCheckZAuction,
	onClose,
}) => {
	const {
		hasExistingBuyNow,
		buyNowPriceAsString,
		paymentTokenLabel,
		paymentTokenSymbol,
		paymentTokenPriceInUsd,
	} = useSetBuyNowData(zna);

	const [toggledValue, setToggledValue] = useState<boolean>(hasExistingBuyNow);

	const isInputValueValid =
		Number(buyNowAmount) &&
		!Number.isNaN(parseFloat(buyNowAmount)) &&
		Number(buyNowAmount) !== 0;

	const isError = buyNowAmount?.length > 0 && !isInputValueValid;
	const primaryButtonText: ButtonsProps['primaryButtonText'] = errorText
		? 'Retry'
		: 'Next';

	const bidAmountConversionString =
		paymentTokenSymbol && buyNowAmount
			? `$${formatNumber(
					Number(paymentTokenPriceInUsd) * Number(buyNowAmount),
			  )}`
			: '-';

	return (
		<>
			<NFTDetails zna={zna} step={step} />

			<div className={styles.Container}>
				{step === Step.DETAILS && (
					<div className={styles.InputWrapper}>
						<ToggleButton
							label={'Enable Buy Now price?'}
							toggled={toggledValue}
							onClick={() => {
								setToggledValue(!toggledValue);
								setBuyNowAmount('');
							}}
						/>

						<Input
							type="number"
							error={isError}
							inputMode="numeric"
							value={buyNowAmount}
							isDisabled={!toggledValue}
							placeholder={`Buy Now Price ${paymentTokenLabel}`}
							onChange={(value: string) => setBuyNowAmount(value)}
						/>

						<span className={styles.Subtext}>{bidAmountConversionString}</span>

						<span className={styles.Subtext}>
							{hasExistingBuyNow
								? `This NFT has an existing buy now price of ${buyNowPriceAsString}`
								: 'This NFT does not have an existing buy now price'}
						</span>
					</div>
				)}

				<Wizard.Buttons
					className={styles.Button}
					isPrimaryButtonActive={
						isInputValueValid || (!toggledValue && hasExistingBuyNow)
					}
					isSecondaryButtonActive
					secondaryButtonText="Cancel"
					primaryButtonText={primaryButtonText}
					onClickPrimaryButton={onCheckZAuction}
					onClickSecondaryButton={onClose}
				/>
			</div>
		</>
	);
};
