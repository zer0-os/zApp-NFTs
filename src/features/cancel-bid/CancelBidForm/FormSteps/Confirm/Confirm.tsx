import { FC } from 'react';

import { Bid } from '@zero-tech/zauction-sdk';

import { TextContent, TextContentProps } from '../ui';
import { Wizard, ConfirmationProps } from '@zero-tech/zui/components/Wizard';

import styles from '../FormSteps.module.scss';

export interface ConfirmProps {
	zna: string;
	bid: Bid;
	errorText: TextContentProps['errorText'];
	onClose: () => void;
	onConfirm: (bid: Bid) => void;
}

export const Confirm: FC<ConfirmProps> = ({
	zna,
	bid,
	errorText,
	onClose,
	onConfirm,
}) => {
	const primaryButtonText: ConfirmationProps['primaryButtonText'] = errorText
		? 'Retry'
		: 'Cancel Bid';

	const textContent =
		'Are you sure you want to cancel your bid?  \n This will cost gas and cannot be undone.';

	const onConfirmAcceptBid = () => onConfirm(bid);

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
