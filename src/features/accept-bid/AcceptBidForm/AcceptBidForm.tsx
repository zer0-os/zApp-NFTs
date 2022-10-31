import { FC, ReactNode } from 'react';

import { useAcceptBidForm } from './hooks/useAcceptBidForm';
import { Bid } from '@zero-tech/zauction-sdk';

import { ApproveZAuction, Complete, Confirm, Details } from './FormSteps';
import { Step } from './AcceptBidForm.constants';
import { Wizard } from '@zero-tech/zui/components';

import styles from './AcceptBidForm.module.scss';

interface AcceptBidFormProps {
	zna: string;
	bid: Bid;
	onClose: () => void;
}

export const AcceptBidForm: FC<AcceptBidFormProps> = ({
	zna,
	bid,
	onClose,
}) => {
	const {
		step,
		error,
		statusText,
		onCheckZAuction,
		onApproveZAuction,
		onConfirmAcceptBid,
	} = useAcceptBidForm(zna, bid);

	let content: ReactNode;

	switch (step) {
		case Step.DETAILS:
			content = (
				<Details
					zna={zna}
					bid={bid}
					error={error}
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

		case Step.CONFIRM:
			content = (
				<Confirm
					zna={zna}
					bid={bid}
					error={error}
					onConfirm={onConfirmAcceptBid}
				/>
			);
			break;

		case Step.COMPLETE:
			content = <Complete zna={zna} onClose={onClose} />;
			break;

		case Step.LOADING:
			content = <Wizard.Loading message={statusText} />;
			break;
	}

	return (
		<Wizard.Container header="Accept Bid">
			<form className={styles.Form}>{content}</form>
		</Wizard.Container>
	);
};
