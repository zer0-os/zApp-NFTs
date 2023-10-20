import { FC } from 'react';

import { useFormSteps } from './FormSteps/hooks/useFormSteps';
import { useAcceptBidForm } from './hooks/useAcceptBidForm';
import { Bid } from '@zero-tech/zauction-sdk';

import { Wizard } from '@zero-tech/zui/components';

import styles from './AcceptBidForm.module.scss';

export interface AcceptBidFormProps {
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

	const { content } = useFormSteps({
		step,
		zna,
		bid,
		error,
		statusText,
		onClose,
		onCheckZAuction,
		onApproveZAuction,
		onConfirmAcceptBid,
	});

	return (
		<Wizard.Container header="Accept Bid">
			<form className={styles.Form}>{content}</form>
		</Wizard.Container>
	);
};
