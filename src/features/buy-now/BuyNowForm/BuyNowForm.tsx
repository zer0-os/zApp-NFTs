import { FC } from 'react';

import { useBuyNowForm } from './hooks';

import { useFormSteps } from './FormSteps/hooks';
import { Wizard } from '@zero-tech/zui/components';

import styles from './BuyNowForm.module.scss';

export interface BuyNowFormProps {
	zna: string;
	onClose: () => void;
}

export const BuyNowForm: FC<BuyNowFormProps> = ({ zna, onClose }) => {
	const {
		step,
		error,
		statusText,
		onConfirmBuyNow,
		onCheckZAuction,
		onApproveZAuction,
	} = useBuyNowForm(zna);

	const { content } = useFormSteps({
		zna,
		step,
		error,
		statusText,
		onCheckZAuction,
		onApproveZAuction,
		onConfirmBuyNow,
		onClose,
	});

	return (
		<Wizard.Container
			className={styles.Container}
			header="Buy Now"
			subHeader={
				'Please review the information and the art to make sure you are purchasing the right NFT.'
			}
		>
			<form className={styles.Form}>{content}</form>
		</Wizard.Container>
	);
};
