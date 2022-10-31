import { useState } from 'react';

import { useAcceptBidData } from '../../useAcceptBidData';
import { useWeb3 } from '../../../../lib/hooks/useWeb3';
import { useZnsSdk } from '../../../../lib/hooks/useZnsSdk';
import { useZAuctionCheck } from '../../../../lib/hooks/useZAuctionCheck';
import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';
import { Bid } from '@zero-tech/zauction-sdk';

import { Step } from '../AcceptBidForm.constants';

enum StatusText {
	APPROVING_ZAUCTION = 'Approving zAuction. This may take up to 20 mins... Please do not close this window or refresh the page.',
	CHECK_ZAUCTION = 'Checking status of zAuction approval...',
	PROCESSING_BID = 'Accepting Bid... This may take up to 20 mins. Do not close this window or refresh your browser.',
	WAITING_FOR_APPROVAL = 'Waiting for approval from your wallet...',
	WAITING_FOR_SIGNATURE = 'Waiting for bid to be signed by wallet...',
}

enum ErrorText {
	FAILED_ZAUCTION_CHECK = 'Failed to check zAuction approval status',
}

export type UseAcceptBidFormReturn = {
	step: Step;
	error: string;
	statusText: string;
	onCheckZAuction: () => void;
	onApproveZAuction: () => void;
	onConfirmAcceptBid: () => void;
};

/**
 * Drives the logic behind the place bid form.
 */
export const useAcceptBidForm = (
	zna: string,
	bid: Bid,
): UseAcceptBidFormReturn => {
	const sdk = useZnsSdk();

	const { account, provider } = useWeb3();
	const { executeTransaction } = useTransaction();
	const { domainId, paymentTokenId } = useAcceptBidData(zna);
	const { data: isZAuctionCheckRequired, error: zAuctionCheckError } =
		useZAuctionCheck(account, paymentTokenId);

	const [error, setError] = useState<string>();
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
			setStep(Step.PLACE_BID);
		}
	};

	const onApproveZAuction = () => {
		setError(undefined);
		return executeTransaction(
			sdk.zauction.approveZAuctionToSpendPaymentToken,
			[paymentTokenId, provider.getSigner()],
			{
				onStart: () => {
					setStep(Step.LOADING);
					setStatusText(StatusText.WAITING_FOR_APPROVAL);
				},
				onProcessing: () => setStatusText(StatusText.APPROVING_ZAUCTION),
				onSuccess: () => setStep(Step.PLACE_BID),
				onError: (error: any) => {
					setError(error.message);
					setStep(Step.ZAUCTION_APPROVE);
				},

				invalidationKeys: [['user', { account, paymentTokenId, bid }]],
			},
		);
	};

	const onConfirmAcceptBid = () => {
		setError(undefined);
		return executeTransaction(
			sdk.zauction.acceptBid,
			[bid, provider.getSigner()],
			{
				onStart: () => {
					setStep(Step.LOADING);
					setStatusText(StatusText.WAITING_FOR_SIGNATURE);
				},
				onProcessing: () => setStatusText(StatusText.PROCESSING_BID),
				onSuccess: () => setStep(Step.COMPLETE),
				onError: (error: any) => {
					setError(error.message);
					setStep(Step.PLACE_BID);
				},

				invalidationKeys: [['user', { account, domainId, bid }]],
			},
		);
	};

	return {
		step,
		error,
		statusText,
		onCheckZAuction,
		onApproveZAuction,
		onConfirmAcceptBid,
	};
};
