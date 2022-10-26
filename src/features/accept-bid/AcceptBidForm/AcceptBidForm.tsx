import { FC, ReactNode } from 'react';

import { useAcceptBidForm } from './hooks/useAcceptBidForm';

import { ApproveZAuction, Complete, Confirm, Details } from './FormSteps';
import { Step } from './AcceptBidForm.constants';
import { Wizard } from '@zero-tech/zui/components';

import styles from './AcceptBidForm.module.scss';

interface AcceptBidFormProps {
	domainId: string;
	bidAmount: string;
	onClose: () => void;
}

export const AcceptBidForm: FC<AcceptBidFormProps> = ({
	domainId,
	bidAmount,
	onClose,
}) => {
	const {
		step,
		error,
		statusText,
		onCheckZAuction,
		onApproveZAuction,
		onConfirmAcceptBid,
	} = useAcceptBidForm(domainId, bidAmount);

	let content: ReactNode;

	switch (step) {
		case Step.DETAILS:
			content = (
				<Details
					error={error}
					domainId={domainId}
					bidAmount={bidAmount}
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

		case Step.PLACE_BID:
			content = (
				<Confirm
					error={error}
					domainId={domainId}
					bidAmount={bidAmount}
					onConfirm={onConfirmAcceptBid}
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
