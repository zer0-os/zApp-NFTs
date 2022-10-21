import { FC, ReactNode } from 'react';

import { usePlaceBidForm } from './hooks/usePlaceBidForm';

import { Details } from './FormSteps';
import { Step } from './PlaceBidForm.constants';
import { Wizard } from '@zero-tech/zui/components';

import styles from './PlaceBidForm.module.scss';

interface PlaceBidFormProps {
	domainId: string;
	tokenBalance: string;
	onClose: () => void;
}

export const PlaceBidForm: FC<PlaceBidFormProps> = ({
	domainId,
	tokenBalance,
	onClose,
}) => {
	const { step, error, onZAuctionCheck, onZAuctionApprove, onConfirmPlaceBid } =
		usePlaceBidForm(domainId, '10');

	let content: ReactNode;

	const zAuctionConfirmationText = (
		<>
			<p>
				{
					'Before you can place a bid, your wallet needs to approve zAuction. You will only need to do this once. This will cost gas.'
				}
			</p>
			{error !== undefined && (
				<span className={styles.ErrorMessage}>{error}</span>
			)}
		</>
	);

	switch (step) {
		case Step.DETAILS:
			content = (
				<Details
					domainId={domainId}
					tokenBalance={tokenBalance}
					error={error}
					onConfirm={onZAuctionCheck}
					onClose={onClose}
				/>
			);
			break;

		case Step.ZAUCTION_CHECK:
			content = (
				<Wizard.Loading
					message={
						<div>
							<p>{'Checking status of zAuction approval...'}</p>
						</div>
					}
				/>
			);
			break;

		case Step.ZAUCTION_APPROVE:
			content = (
				<Wizard.Confirmation
					className={styles.Confirmation}
					message={zAuctionConfirmationText}
					isPrimaryButtonActive
					isSecondaryButtonActive
					primaryButtonText={'Continue'}
					secondaryButtonText={'Cancel'}
					onClickPrimaryButton={onZAuctionApprove}
					onClickSecondaryButton={onClose}
				/>
			);
			break;

		case Step.WAITING_FOR_WALLET:
			content = (
				<Wizard.Loading
					message={
						<div>
							<p>{'Waiting for approval from your wallet...'}</p>
						</div>
					}
				/>
			);
			break;

		case Step.PROCESSING:
			content = (
				<Wizard.Loading
					message={
						<div>
							<p>
								{
									'Approving zAuction. This may take up to 20 mins... Please do not close this window or refresh the page.'
								}
							</p>
						</div>
					}
				/>
			);
			break;

		case Step.CONFIRM_BID:
			content = <>Confirm</>;
			break;

		case Step.COMPLETE:
			content = <>Complete</>;
			break;
	}

	return (
		<form className={styles.Form}>
			<Wizard.Container header="Place A Bid">{content}</Wizard.Container>
		</form>
	);
};
