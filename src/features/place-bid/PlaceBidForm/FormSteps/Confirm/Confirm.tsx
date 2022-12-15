import { FC } from 'react';

import { usePlaceBidData } from '../../../usePlaceBidData';

import { NFTDetails, TextContent } from '../ui';
import { Wizard } from '@zero-tech/zui/components/Wizard';

import styles from '../FormSteps.module.scss';

export interface ConfirmProps {
	zna: string;
	errorText: string;
	bidAmount: string;
	onConfirm: () => void;
}

export const Confirm: FC<ConfirmProps> = ({
	zna,
	errorText,
	bidAmount,
	onConfirm,
}) => {
	const { paymentTokenSymbol } = usePlaceBidData(zna);

	const textContent = `Are you sure you want to place a bid of ${bidAmount} ${paymentTokenSymbol} on 0://${zna}.`;

	const primaryButtonText = errorText ? 'Retry' : 'Continue';

	const onConfirmPlaceBid = () => onConfirm();

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
