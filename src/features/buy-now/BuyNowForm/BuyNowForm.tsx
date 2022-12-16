import { FC } from 'react';

import { useBuyNowForm } from './hooks';

import { Step, useFormSteps } from './FormSteps/hooks';
import { Wizard } from '@zero-tech/zui/components';

import styles from './BuyNowForm.module.scss';

export interface BuyNowFormProps {
	zna: string;
	onClose: () => void;
}

export const BuyNowForm: FC<BuyNowFormProps> = ({ zna, onClose }) => {
	const { step, error, statusText, isLeadingBid, onBuyNow, onNext } =
		useBuyNowForm(zna);

	const subHeader = getSubHeader(step, isLeadingBid);

	const { content } = useFormSteps({
		zna,
		step,
		error,
		statusText,
		onBuyNow,
		onNext,
		onClose,
	});

	return (
		<Wizard.Container
			className={styles.Container}
			header="Buy Now"
			subHeader={subHeader}
		>
			<form className={styles.Form}>{content}</form>
		</Wizard.Container>
	);
};

/***************
 * getSubHeader
 ***************/

const getSubHeader = (step: Step, isLeadingBid: boolean) => {
	if (step !== Step.DETAILS) {
		return;
	}
	const subHeader = isLeadingBid
		? 'Your bid is leading the auction currently. \nAre you sure you want to cancel your bid?'
		: 'Your bid is not leading the auction. \nAre you sure you want to cancel your bid?';

	return subHeader;
};
