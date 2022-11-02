import { FC } from 'react';

import { usePlaceBidForm } from './hooks';
import { useFormSteps, useFormStepsProps } from './FormSteps/hooks';

import { Wizard } from '@zero-tech/zui/components';

import styles from './PlaceBidForm.module.scss';

interface PlaceBidFormProps {
	zna: string;
	tokenBalance: string;
	onClose: useFormStepsProps['onClose'];
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

	const { content } = useFormSteps({
		zna,
		step,
		error,
		statusText,
		tokenBalance,
		bidAmount,
		setBidAmount,
		onCheckZAuction,
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
