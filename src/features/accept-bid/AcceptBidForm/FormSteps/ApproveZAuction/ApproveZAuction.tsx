import { Wizard } from '@zero-tech/zui/components';

import styles from '../FormSteps.module.scss';

interface ApproveZAuctionProps {
	error: string;
	onClose: () => void;
	onApproveZAuction: () => void;
}

export const ApproveZAuction = ({
	error,
	onClose,
	onApproveZAuction,
}: ApproveZAuctionProps) => {
	const zAuctionConfirmationText = (
		<>
			<p>
				Before you can accept a bid, your wallet needs to approve zAuction. You
				will only need to do this once. This will cost gas.
			</p>
			{error !== undefined && <span className={styles.Error}>{error}</span>}
		</>
	);

	return (
		<div className={styles.Container}>
			<Wizard.Confirmation
				className={styles.Confirmation}
				message={zAuctionConfirmationText}
				isPrimaryButtonActive
				isSecondaryButtonActive
				primaryButtonText={error ? 'Retry' : 'Continue'}
				secondaryButtonText={'Cancel'}
				onClickPrimaryButton={onApproveZAuction}
				onClickSecondaryButton={onClose}
			/>
		</div>
	);
};
