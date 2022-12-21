import { ReactNode, useState } from 'react';

import { usePlaceBidData } from '../../../usePlaceBidData';
import { Bid } from '@zero-tech/zauction-sdk';

import { ApproveZAuction, Complete, Confirm, Details } from '..';
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
	onConfirmPlaceBid: () => void;
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
	onConfirmPlaceBid,
	onClose,
}: useFormStepsProps): UseFormStepsReturn => {
	const { paymentTokenSymbol, isLoadingTokenBalance } = usePlaceBidData(zna);

	const [showBalanceLoader, setShowBalanceLoader] = useState<boolean>(
		isLoadingTokenBalance,
	);

	let content: ReactNode;

	switch (step) {
		case Step.DETAILS:
			content = !showBalanceLoader ? (
				<Details
					zna={zna}
					errorText={error}
					bidAmount={bidAmount}
					setBidAmount={setBidAmount}
					onCheckZAuction={onCheckZAuction}
					onClose={onClose}
				/>
			) : (
				<Wizard.Loading message={`Loading ${paymentTokenSymbol} balance...`} />
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

	// prevent jolt for fast data loading
	setTimeout(() => {
		if (!isLoadingTokenBalance) {
			setShowBalanceLoader(false);
		}
	}, 1000);

	return { content };
};
