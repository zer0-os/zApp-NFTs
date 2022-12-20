import { FC } from 'react';

import { useSetBuyNowForm } from './hooks';
import { useFormSteps } from './FormSteps/hooks';
import { Wizard } from '@zero-tech/zui/components';

import styles from './SetBuyNowForm.module.scss';

export interface SetBuyNowFormProps {
	zna: string;
	onClose: () => void;
}

export const SetBuyNowForm: FC<SetBuyNowFormProps> = ({ zna, onClose }) => {
	const {
		step,
		error,
		statusText,
		bidAmount,
		setBidAmount,
		onConfirmSetBuyNow,
		onCheckZAuction,
		onApproveZAuction,
	} = useSetBuyNowForm(zna);

	const { content } = useFormSteps({
		zna,
		step,
		error,
		statusText,
		bidAmount,
		setBidAmount,
		onCheckZAuction,
		onApproveZAuction,
		onConfirmSetBuyNow,
		onClose,
	});

	return (
		<Wizard.Container className={styles.Container} header="Set Buy Now">
			<form className={styles.Form}>{content}</form>
		</Wizard.Container>
	);
};
