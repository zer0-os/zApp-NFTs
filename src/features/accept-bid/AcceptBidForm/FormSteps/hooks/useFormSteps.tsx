import { ReactNode } from 'react';

import { Bid } from '@zero-tech/zauction-sdk';

import { ApproveZAuction, Complete, Confirm, Details } from '..';
import { Wizard } from '@zero-tech/zui';

export enum Step {
	DETAILS,
	ZAUCTION_APPROVE,
	CONFIRM,
	COMPLETE,
	LOADING,
}

interface UseFormStepsReturn {
	content: ReactNode;
}

export interface useFormStepsProps {
	zna: string;
	bid: Bid;
	step: Step;
	error: string;
	statusText: string;
	onCheckZAuction: () => void;
	onApproveZAuction: () => void;
	onConfirmAcceptBid: (bid: Bid) => void;
	onClose: () => void;
}

export const useFormSteps = ({
	zna,
	bid,
	step,
	error,
	statusText,
	onCheckZAuction,
	onApproveZAuction,
	onConfirmAcceptBid,
	onClose,
}: useFormStepsProps): UseFormStepsReturn => {
	let content: ReactNode;

	switch (step) {
		case Step.DETAILS:
			content = (
				<Details
					zna={zna}
					bid={bid}
					errorText={error}
					onClose={onClose}
					onCheckZAuction={onCheckZAuction}
				/>
			);
			break;

		case Step.ZAUCTION_APPROVE:
			content = (
				<ApproveZAuction
					errorText={error}
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
					errorText={error}
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

	return { content };
};
