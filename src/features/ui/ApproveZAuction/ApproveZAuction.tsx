import { FormTextContent } from '../FormTextContent';
import { Wizard } from '@zero-tech/zui/components/Wizard';

import styles from './ApproveZAuction.module.scss';

export interface ApproveZAuctionProps {
	action: string;
	errorText: string;
	onClose: () => void;
	onApproveZAuction: () => void;
}

export const ApproveZAuction = ({
	action,
	errorText,
	onClose,
	onApproveZAuction,
}: ApproveZAuctionProps) => {
	const primaryButtonText = errorText ? 'Retry' : 'Continue';

	const confirmationMessage = (
		<FormTextContent
			textContent={`Before you can ${action}, your wallet needs to approve zAuction. \nYou will only need to do this once. This will cost gas.`}
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
