import { useState } from 'react';

import { usePlaceBidData } from '../../usePlaceBidData';
import { useWeb3 } from '../../../../lib/hooks/useWeb3';
import { useZnsSdk } from '../../../../lib/hooks/useZnsSdk';
import { useZAuctionCheck } from '../../../../lib/hooks/useZAuctionCheck';
import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';

import { Step } from '../PlaceBidForm.constants';

enum StatusText {
	APPROVING_ZAUCTION = 'Approving zAuction. This may take up to 20 mins... Please do not close this window or refresh the page.',
	CHECK_ZAUCTION = 'Checking status of zAuction approval...',
	PROCESSING_BID = 'Processing bid...',
	WAITING_FOR_APPROVAL = 'Waiting for approval from your wallet...',
	WAITING_FOR_SIGNATURE = 'Waiting for bid to be signed by wallet...',
}

enum ErrorText {
	FAILED_ZAUCTION_CHECK = 'Failed to check zAuction approval status',
}

export type UsePlaceBidFormReturn = {
	step: Step;
	error: string;
	statusText: string;
	bidAmount: string;
	setBidAmount: (bidAmount: string) => void;
	onCheckZAuction: () => void;
	onApproveZAuction: () => void;
	onConfirmPlaceBid: () => void;
};

/**
 * Drives the logic behind the place bid form.
 */
export const usePlaceBidForm = (zna: string): UsePlaceBidFormReturn => {
	const sdk = useZnsSdk();

	const { account, provider } = useWeb3();
	const { executeTransaction } = useTransaction();
	const { domainId, paymentTokenForDomain } = usePlaceBidData(zna);
	const { data: isZAuctionCheckRequired, error: zAuctionCheckError } =
		useZAuctionCheck(account, paymentTokenForDomain);

	const [error, setError] = useState<string>();
	const [bidAmount, setBidAmount] = useState<string>();
	const [step, setStep] = useState<Step>(Step.DETAILS);
	const [statusText, setStatusText] = useState<string>();

	const onCheckZAuction = async () => {
		setError(undefined);
		setStep(Step.LOADING);
		setStatusText(StatusText.CHECK_ZAUCTION);

		// set timeout to prevent container jolt
		await new Promise((r) => setTimeout(r, 1500));

		if (isZAuctionCheckRequired) {
			setStep(Step.ZAUCTION_APPROVE);
		} else if (zAuctionCheckError) {
			setError(ErrorText.FAILED_ZAUCTION_CHECK);
			setStep(Step.DETAILS);
		} else {
			setStep(Step.CONFIRM_BID);
		}
	};

	const onApproveZAuction = () => {
		setError(undefined);
		return executeTransaction(
			sdk.zauction.approveZAuctionToSpendPaymentToken,
			[paymentTokenForDomain, provider.getSigner()],
			{
				onStart: () => {
					setStep(Step.LOADING);
					setStatusText(StatusText.WAITING_FOR_APPROVAL);
				},
				onProcessing: () => setStatusText(StatusText.APPROVING_ZAUCTION),
				onSuccess: () => setStep(Step.CONFIRM_BID),
				onError: (error: any) => {
					setError(error.message);
					setStep(Step.ZAUCTION_APPROVE);
				},

				invalidationKeys: [
					['user', { account, paymentTokenForDomain, bidAmount }],
				],
			},
		);
	};

	const onConfirmPlaceBid = () => {
		setError(undefined);
		return executeTransaction(
			sdk.zauction.placeBid,
			[
				{
					domainId,
					bidAmount: Number(bidAmount),
				},
				provider.getSigner(),
			],
			{
				onStart: () => {
					setStep(Step.LOADING);
					setStatusText(StatusText.WAITING_FOR_SIGNATURE);
				},
				onProcessing: () => setStatusText(StatusText.PROCESSING_BID),
				onSuccess: () => setStep(Step.COMPLETE),
				onError: (error: any) => {
					setError(error.message);
					setStep(Step.CONFIRM_BID);
				},

				invalidationKeys: [['user', { account, domainId, bidAmount }]],
			},
		);
	};

	return {
		step,
		error,
		statusText,
		bidAmount,
		setBidAmount,
		onCheckZAuction,
		onApproveZAuction,
		onConfirmPlaceBid,
	};
};
