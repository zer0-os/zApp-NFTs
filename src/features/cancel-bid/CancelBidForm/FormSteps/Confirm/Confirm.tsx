import { FC } from 'react';

import { useCancelBidData } from '../../../useCancelBidData';
import { Bid } from '@zero-tech/zauction-sdk';

import { TextContent, TextContentProps } from '../ui';
import { Wizard, ConfirmationProps } from '@zero-tech/zui/components/Wizard';

import styles from '../FormSteps.module.scss';

export interface ConfirmProps {
	zna: string;
	errorText: TextContentProps['errorText'];
	onClose: () => void;
	onConfirm: (bid: Bid) => void;
}

export const Confirm: FC<ConfirmProps> = ({
	zna,
	errorText,
	onClose,
	onConfirm,
}) => {
	const { highestUserBid } = useCancelBidData(zna);

	const primaryButtonText: ConfirmationProps['primaryButtonText'] = errorText
		? 'Retry'
		: 'Cancel Bid';

	const textContent =
		'Are you sure you want to cancel your bid? \n This will cost gas and cannot be undone.';

	const onConfirmAcceptBid = () => onConfirm(highestUserBid);

	return (
		<>
			<div className={styles.Container}>
				<Wizard.Confirmation
					className={styles.Confirmation}
					isPrimaryButtonActive
					isSecondaryButtonActive
					primaryButtonText={primaryButtonText}
					secondaryButtonText={'Cancel'}
					onClickPrimaryButton={onConfirmAcceptBid}
					onClickSecondaryButton={onClose}
					message={
						<TextContent textContent={textContent} errorText={errorText} />
					}
				/>
			</div>
		</>
	);
};
