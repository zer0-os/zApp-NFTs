import { FC } from 'react';

import { useCancelBidForm, ZAuctionVersionType } from './hooks';
import { Step, useFormSteps, useFormStepsProps } from './FormSteps/hooks';

import { Wizard } from '@zero-tech/zui/components';

import styles from './CancelBidForm.module.scss';

export interface CancelBidFormProps {
	zna: string;
	tokenBalance: useFormStepsProps['tokenBalance'];
	onClose: useFormStepsProps['onClose'];
}

export const CancelBidForm: FC<CancelBidFormProps> = ({
	zna,
	tokenBalance,
	onClose,
}) => {
	let bid;
	const bidNonce = '';
	const bidVersion = ZAuctionVersionType.V1;

	const { step, error, statusText, onCancelBid, onNext } = useCancelBidForm(
		zna,
		bidNonce,
		bidVersion,
	);

	const { content } = useFormSteps({
		zna,
		bid,
		step,
		error,
		statusText,
		tokenBalance,
		onCancelBid,
		onNext,
		onClose,
	});

	return (
		<Wizard.Container
			header="Cancel Bid"
			subHeader={
				step === Step.DETAILS &&
				'Your bid is leading the auction currently. Are you sure you want to cancel your bid?'
			}
		>
			<form className={styles.Form}>{content}</form>
		</Wizard.Container>
	);
};
