import { FC } from 'react';

import { usePlaceBidData } from '../../../usePlaceBidData';

import { NFTDetails, TextContent, TextContentProps } from '../ui';
import { Wizard, ButtonsProps } from '@zero-tech/zui/components/Wizard';

import styles from '../FormSteps.module.scss';

export interface ConfirmProps {
	zna: string;
	errorText: TextContentProps['errorText'];
	bidAmount: string;
	onConfirm: (bidAmount: string) => void;
}

export const Confirm: FC<ConfirmProps> = ({
	zna,
	errorText,
	bidAmount,
	onConfirm,
}) => {
	const { paymentTokenLabel } = usePlaceBidData(zna);

	const textContent = `Are you sure you want to place a bid of ${bidAmount} ${paymentTokenLabel} for 0://${zna}.`;

	const primaryButtonText: ButtonsProps['primaryButtonText'] = errorText
		? 'Retry'
		: 'Continue';

	const onConfirmPlaceBid = () => onConfirm(bidAmount);

	return (
		<>
			<NFTDetails zna={zna} />

			<div className={styles.Container}>
				<TextContent textContent={textContent} errorText={errorText} />

				<Wizard.Buttons
					className={styles.Button}
					isPrimaryButtonActive
					primaryButtonText={primaryButtonText}
					onClickPrimaryButton={onConfirmPlaceBid}
				/>
			</div>
		</>
	);
};
