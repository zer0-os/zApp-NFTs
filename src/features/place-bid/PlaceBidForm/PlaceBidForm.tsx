import { FC, ReactNode } from 'react';

import { usePlaceBidForm } from './hooks/usePlaceBidForm';

import { ApproveZAuction, Complete, ConfirmBid, Details } from './FormSteps';
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
	const {
		step,
		error,
		statusText,
		bidAmount,
		setBidAmount,
		onCheckZAuction,
		onApproveZAuction,
		onConfirmPlaceBid,
	} = usePlaceBidForm(domainId);

	let content: ReactNode;

	switch (step) {
		case Step.DETAILS:
			content = (
				<Details
					error={error}
					domainId={domainId}
					bidAmount={bidAmount}
					tokenBalance={tokenBalance}
					setBidAmount={setBidAmount}
					onCheckZAuction={onCheckZAuction}
					onClose={onClose}
				/>
			);
			break;

		case Step.ZAUCTION_APPROVE:
			content = (
				<ApproveZAuction
					error={error}
					onClose={onClose}
					onApproveZAuction={onApproveZAuction}
				/>
			);
			break;

		case Step.CONFIRM_BID:
			content = (
				<ConfirmBid
					error={error}
					domainId={domainId}
					bidAmount={bidAmount}
					onConfirm={onConfirmPlaceBid}
				/>
			);
			break;

		case Step.COMPLETE:
			content = <Complete domainId={domainId} onClose={onClose} />;
			break;

		case Step.LOADING:
			content = <Wizard.Loading message={statusText} />;
			break;
	}

	return (
		<form className={styles.Form}>
			<Wizard.Container header="Place A Bid">{content}</Wizard.Container>
		</form>
	);
};
