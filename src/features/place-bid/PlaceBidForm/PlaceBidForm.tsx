import { FC } from 'react';

import { usePlaceBidForm } from './hooks';
import { useFormSteps } from './FormSteps/hooks';

import { Wizard } from '@zero-tech/zui';

import styles from './PlaceBidForm.module.scss';

interface PlaceBidFormProps {
	zna: string;
	onClose: () => void;
}

export const PlaceBidForm: FC<PlaceBidFormProps> = ({ zna, onClose }) => {
	const {
		step,
		error,
		statusText,
		bidAmount,
		onSubmitBidAmount,
		onApproveZAuction,
		onConfirmPlaceBid,
	} = usePlaceBidForm(zna);

	const { content } = useFormSteps({
		zna,
		step,
		error,
		statusText,
		bidAmount,
		onSubmitBidAmount,
		onApproveZAuction,
		onConfirmPlaceBid,
		onClose,
	});

	return (
		<Wizard.Container header="Place A Bid">
			<form className={styles.Form}>{content}</form>
		</Wizard.Container>
	);
};
