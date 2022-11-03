import { FC } from 'react';

import { useCancelBidForm, ZAuctionVersionType } from './hooks';

import { Step, useFormSteps, useFormStepsProps } from './FormSteps/hooks';
import { Wizard } from '@zero-tech/zui/components';

import styles from './CancelBidForm.module.scss';

export interface CancelBidFormProps {
	zna: string;
	onClose: useFormStepsProps['onClose'];
}

export const CancelBidForm: FC<CancelBidFormProps> = ({ zna, onClose }) => {
	let bid;
	const bidNonce = '';
	const bidVersion = ZAuctionVersionType.V1;

	const { step, error, statusText, onCancelBid, onNext } = useCancelBidForm(
		zna,
		bidNonce,
		bidVersion,
	);

	const subHeader = getSubHeader(step, true);

	const { content } = useFormSteps({
		zna,
		bid,
		step,
		error,
		statusText,
		onCancelBid,
		onNext,
		onClose,
	});

	return (
		<Wizard.Container
			className={styles.Container}
			header="Cancel Bid"
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
	const subHeader = isLeadingBid
		? 'Your bid is leading the auction currently. \nAre you sure you want to cancel your bid?'
		: 'Your bid is not leading the auction. \nAre you sure you want to cancel your bid?';

	return step === Step.DETAILS ? subHeader : undefined;
};
