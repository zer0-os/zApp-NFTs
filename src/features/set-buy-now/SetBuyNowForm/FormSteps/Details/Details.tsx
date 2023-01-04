import { FC, useState } from 'react';

import { Step } from '../hooks';
import { formatNumber } from '../../../../../lib/util';
import { useSetBuyNowData } from '../../../useSetBuyNowData';

import { NFTDetails } from '../ui';
import { FormTextContent, ToggleButton } from '../../../../ui';
import { Input } from '@zero-tech/zui/components/Input';
import { Wizard, ButtonsProps } from '@zero-tech/zui/components/Wizard';

import styles from '../FormSteps.module.scss';

export interface DetailsProps {
	zna: string;
	step: Step;
	errorText: string;
	bidAmount: string;
	setBidAmount?: (bid: string) => void;
	onCheckZAuction?: () => void;
	onConfirmSetBuyNow?: () => void;
	onClose: () => void;
}

export const Details: FC<DetailsProps> = ({
	zna,
	step,
	errorText,
	bidAmount,
	setBidAmount,
	onCheckZAuction,
	onConfirmSetBuyNow,
	onClose,
}) => {
	const {
		hasExistingBuyNow,
		buyNowPriceAsString,
		paymentTokenLabel,
		paymentTokenSymbol,
		paymentTokenPriceInUsd,
	} = useSetBuyNowData(zna);

	const isInputValueValid =
		Number(bidAmount) &&
		!Number.isNaN(parseFloat(bidAmount)) &&
		Number(bidAmount) !== 0;

	const [toggledValue, setToggledValue] = useState<boolean>(hasExistingBuyNow);

	const isPrimaryButtonActive =
		isInputValueValid || !toggledValue || step === Step.CONFIRM;

	const primaryButtonText: ButtonsProps['primaryButtonText'] =
		step === Step.CONFIRM ? (errorText ? 'Retry' : 'Confirm') : 'Next';

	const primaryButtonEvent: ButtonsProps['onClickPrimaryButton'] =
		step === Step.DETAILS ? onCheckZAuction : onConfirmSetBuyNow;

	const bidAmountConversionString =
		paymentTokenSymbol && bidAmount
			? `$${formatNumber(Number(paymentTokenPriceInUsd) * Number(bidAmount))}`
			: '-';

	console.log('TOGG', toggledValue);
	const isRemovingBuyNow = isInputValueValid && toggledValue === false;

	return (
		<>
			<NFTDetails zna={zna} step={step} />

			<div className={styles.Container}>
				{step === Step.DETAILS && (
					<div className={styles.InputWrapper}>
						<ToggleButton
							label={'Enable Buy Now price?'}
							toggled={toggledValue}
							onClick={() => setToggledValue(!toggledValue)}
						/>

						<Input
							value={isRemovingBuyNow ? bidAmount : ''}
							type="number"
							inputMode="numeric"
							placeholder={`Buy Now Price ${paymentTokenLabel}`}
							onChange={(value: string) =>
								setBidAmount &&
								setBidAmount(isRemovingBuyNow ? undefined : value)
							}
							error={bidAmount?.length > 0 && !isInputValueValid}
							isDisabled={!toggledValue}
						/>
						<span className={styles.Subtext}>{bidAmountConversionString}</span>

						<span className={styles.Subtext}>
							{hasExistingBuyNow
								? `This NFT has an existing buy now price of ${buyNowPriceAsString}`
								: 'This NFT does not have an existing buy now price'}
						</span>
					</div>
				)}

				{step === Step.CONFIRM && (
					<FormTextContent
						textContent={
							isRemovingBuyNow
								? `Are you sure you want to set a buy now price of ${bidAmount} ${paymentTokenSymbol} for ${zna}?`
								: `Are you sure you want to turn off and remove the buy now price for ${zna}?`
						}
						errorText={errorText}
					/>
				)}

				<Wizard.Buttons
					className={styles.Button}
					isPrimaryButtonActive={isPrimaryButtonActive}
					isSecondaryButtonActive
					secondaryButtonText="Cancel"
					primaryButtonText={primaryButtonText}
					onClickPrimaryButton={primaryButtonEvent}
					onClickSecondaryButton={onClose}
				/>
			</div>
		</>
	);
};
