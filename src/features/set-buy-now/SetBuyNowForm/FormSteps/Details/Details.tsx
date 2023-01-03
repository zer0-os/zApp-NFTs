import { FC } from 'react';

import { Step } from '../hooks';
import { useSetBuyNowData } from '../../../useSetBuyNowData';

import { NFTDetails } from '../ui';
import { FormErrorText, FormTextContent } from '../../../../ui';
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
	const { paymentTokenLabel, paymentTokenSymbol } = useSetBuyNowData(zna);

	const isInputValueValid =
		Number(bidAmount) &&
		!Number.isNaN(parseFloat(bidAmount)) &&
		Number(bidAmount) !== 0;

	const primaryButtonText: ButtonsProps['primaryButtonText'] =
		step === Step.CONFIRM ? (errorText ? 'Retry' : 'Confirm') : 'Next';

	const primaryButtonEvent: ButtonsProps['onClickPrimaryButton'] =
		step === Step.DETAILS ? onCheckZAuction : onConfirmSetBuyNow;

	return (
		<>
			<NFTDetails zna={zna} step={step} />

			<div className={styles.Container}>
				{step === Step.DETAILS && (
					<Input
						value={bidAmount ?? ''}
						type="number"
						inputMode="numeric"
						placeholder={`Buy Now Price ${paymentTokenLabel}`}
						onChange={(value: string) => setBidAmount && setBidAmount(value)}
						error={bidAmount?.length > 0 && !isInputValueValid}
					/>
				)}

				{step === Step.CONFIRM && (
					<FormTextContent
						textContent={`Are you sure you want to set a buy now price of ${bidAmount} ${paymentTokenSymbol} for NFT Name?`}
						errorText={errorText}
					/>
				)}

				<Wizard.Buttons
					className={styles.Button}
					isPrimaryButtonActive={isInputValueValid}
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
