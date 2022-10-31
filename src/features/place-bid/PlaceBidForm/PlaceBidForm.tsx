import { FC, ReactNode } from 'react';

import { usePlaceBidForm } from './hooks/usePlaceBidForm';

import { getDomainId } from '../../../lib/util';

import { ApproveZAuction, Complete, ConfirmBid, Details } from './FormSteps';
import { Step } from './PlaceBidForm.constants';
import { Wizard } from '@zero-tech/zui/components';

import styles from './PlaceBidForm.module.scss';

interface PlaceBidFormProps {
	zna: string;
	tokenBalance: string;
	onClose: () => void;
}

export const PlaceBidForm: FC<PlaceBidFormProps> = ({
	zna,
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
	} = usePlaceBidForm(zna);

	let content: ReactNode;

	switch (step) {
		case Step.DETAILS:
			content = (
				<Details
					error={error}
					zna={zna}
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
					zna={zna}
					bidAmount={bidAmount}
					onConfirm={onConfirmPlaceBid}
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
		<Wizard.Container header="Place A Bid">
			<form className={styles.Form}>{content} </form>
		</Wizard.Container>
	);
};
