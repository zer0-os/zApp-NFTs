import { ReactNode } from 'react';

import {
	ApproveZAuction,
	ApproveZAuctionProps,
	Complete,
	CompleteProps,
	Confirm,
	ConfirmProps,
	Details,
	DetailsProps,
} from '..';
import { Wizard } from '@zero-tech/zui/components';

export enum Step {
	DETAILS,
	ZAUCTION_APPROVE,
	CONFIRM,
	COMPLETE,
	LOADING,
}

interface useFormStepsReturn {
	content: ReactNode;
}

export interface useFormStepsProps {
	zna: string;
	step: Step;
	error: string;
	statusText: string;
	tokenBalance: string;
	bidAmount: string;
	setBidAmount: DetailsProps['setBidAmount'];
	onCheckZAuction: DetailsProps['onCheckZAuction'];
	onApproveZAuction: ApproveZAuctionProps['onApproveZAuction'];
	onConfirmPlaceBid: ConfirmProps['onConfirm'];
	onClose:
		| DetailsProps['onClose']
		| ApproveZAuctionProps['onClose']
		| CompleteProps['onClose'];
}

export const useFormSteps = ({
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
}: useFormStepsProps): useFormStepsReturn => {
	let content: ReactNode;

	switch (step) {
		case Step.DETAILS:
			content = (
				<Details
					zna={zna}
					error={error}
					bidAmount={bidAmount}
					tokenBalance={tokenBalance}
					setBidAmount={setBidAmount}
					onCheckZAuction={onCheckZAuction}
					onClose={onClose}
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
					errorText={error}
					bidAmount={bidAmount}
					onConfirm={onConfirmPlaceBid}
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
