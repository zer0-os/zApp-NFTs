import { TextContent, TextContentProps } from '../ui';
import { Wizard, ConfirmationProps } from '@zero-tech/zui/components/Wizard';

import styles from '../FormSteps.module.scss';

export interface ApproveZAuctionProps {
	errorText: TextContentProps['errorText'];
	onClose: ConfirmationProps['onClickSecondaryButton'];
	onApproveZAuction: ConfirmationProps['onClickPrimaryButton'];
}

export const ApproveZAuction = ({
	errorText,
	onClose,
	onApproveZAuction,
}: ApproveZAuctionProps) => {
	const primaryButtonText: ConfirmationProps['primaryButtonText'] = errorText
		? 'Retry'
		: 'Continue';

	const textContent =
		'Before you can accept a bid, your wallet needs to approve zAuction. \nYou will only need to do this once. This will cost gas.';

	const confirmationMessage = (
		<TextContent textContent={textContent} errorText={errorText} />
	);

	return (
		<div className={styles.Container}>
			<Wizard.Confirmation
				className={styles.Confirmation}
				message={confirmationMessage}
				isPrimaryButtonActive
				isSecondaryButtonActive
				primaryButtonText={primaryButtonText}
				secondaryButtonText={'Cancel'}
				onClickPrimaryButton={onApproveZAuction}
				onClickSecondaryButton={onClose}
			/>
		</div>
	);
};
