import { TextContent } from '../ui';
import { Wizard } from '@zero-tech/zui';

import styles from '../FormSteps.module.scss';

export interface ApproveZAuctionProps {
	errorText: string;
	onClose: () => void;
	onApproveZAuction: () => void;
}

export const ApproveZAuction = ({
	errorText,
	onClose,
	onApproveZAuction,
}: ApproveZAuctionProps) => {
	const primaryButtonText = errorText ? 'Retry' : 'Continue';

	const confirmationMessage = (
		<TextContent
			textContent={
				'Before you can accept a bid, your wallet needs to approve zAuction. \nYou will only need to do this once. This will cost gas.'
			}
			errorText={errorText}
		/>
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
