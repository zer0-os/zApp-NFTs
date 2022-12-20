import { ReactNode } from 'react';

import { Complete, Details } from '..';
import { ApproveZAuction } from '../../../../ui';
import { Wizard } from '@zero-tech/zui/components';

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
	step: Step;
	error: string;
	statusText: string;
	bidAmount: string;
	setBidAmount: (bid: string) => void;
	onCheckZAuction: () => void;
	onApproveZAuction: () => void;
	onConfirmSetBuyNow: () => void;
	onClose: () => void;
}

export const useFormSteps = ({
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
}: useFormStepsProps): UseFormStepsReturn => {
	let content: ReactNode;

	switch (step) {
		case Step.DETAILS:
			content = (
				<Details
					zna={zna}
					step={step}
					errorText={error}
					bidAmount={bidAmount}
					setBidAmount={setBidAmount}
					onCheckZAuction={onCheckZAuction}
					onClose={onClose}
				/>
			);
			break;

		case Step.ZAUCTION_APPROVE:
			content = (
				<ApproveZAuction
					action={'set buy now'}
					errorText={error}
					onClose={onClose}
					onApproveZAuction={onApproveZAuction}
				/>
			);
			break;

		case Step.CONFIRM:
			content = (
				<Details
					zna={zna}
					step={step}
					errorText={error}
					bidAmount={bidAmount}
					onConfirmSetBuyNow={onConfirmSetBuyNow}
					onClose={onClose}
				/>
			);
			break;

		case Step.COMPLETE:
			content = <Complete zna={zna} step={step} onClose={onClose} />;
			break;

		case Step.LOADING:
			content = <Wizard.Loading message={statusText} />;
			break;
	}

	return { content };
};
