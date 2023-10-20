import { FC } from 'react';

import { Step } from '../hooks';
import { useSetBuyNowData } from '../../../useSetBuyNowData';

import { NFTDetails } from '../ui';
import { FormTextContent } from '../../../../ui';
import { Wizard, ButtonsProps } from '@zero-tech/zui';

import styles from '../FormSteps.module.scss';

export interface ConfirmProps {
	zna: string;
	step: Step;
	errorText: string;
	buyNowAmount: string;
	onConfirmSetBuyNow: () => void;
	onClose: () => void;
}

export const Confirm: FC<ConfirmProps> = ({
	zna,
	step,
	errorText,
	buyNowAmount,
	onConfirmSetBuyNow,
	onClose,
}) => {
	const { paymentTokenSymbol } = useSetBuyNowData(zna);

	const primaryButtonText: ButtonsProps['primaryButtonText'] = errorText
		? 'Retry'
		: 'Confirm';

	return (
		<>
			<NFTDetails zna={zna} step={step} />

			<div className={styles.Container}>
				<FormTextContent
					textContent={
						buyNowAmount !== ''
							? `Are you sure you want to set a buy now price of ${buyNowAmount} ${paymentTokenSymbol} for ${zna}?`
							: `Are you sure you want to turn off and remove the buy now price for ${zna}?`
					}
					errorText={errorText}
				/>

				<Wizard.Buttons
					className={styles.Button}
					isPrimaryButtonActive
					isSecondaryButtonActive
					secondaryButtonText="Cancel"
					primaryButtonText={primaryButtonText}
					onClickPrimaryButton={onConfirmSetBuyNow}
					onClickSecondaryButton={onClose}
				/>
			</div>
		</>
	);
};
