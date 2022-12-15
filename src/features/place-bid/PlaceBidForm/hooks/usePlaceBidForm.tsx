import { useState } from 'react';

import { usePlaceBidData } from '../../usePlaceBidData';
import { useWeb3 } from '../../../../lib/hooks/useWeb3';
import { useZnsSdk } from '../../../../lib/hooks/useZnsSdk';
import { useZAuctionCheck } from '../../../../lib/hooks/useZAuctionCheck';
import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';

import { Step } from '../FormSteps/hooks';
import { ethers } from 'ethers';

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
	const { domainId, paymentTokenId } = usePlaceBidData(zna);
	const { data: isZAuctionCheckRequired, error: zAuctionCheckError } =
		useZAuctionCheck(account, paymentTokenId);

	const [step, setStep] = useState<Step>(Step.DETAILS);
	const [error, setError] = useState<string>();
	const [bidAmount, setBidAmount] = useState<string>('');
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
			setStep(Step.CONFIRM);
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
				onSuccess: () => setStep(Step.CONFIRM),
				onError: (error: any) => {
					setError(error.message);
					setStep(Step.ZAUCTION_APPROVE);
				},

				invalidationKeys: [['user', { account, paymentTokenId, bidAmount }]],
			},
		);
	};

	const onConfirmPlaceBid = async () => {
		const bidAmountAsNumber = Number(bidAmount);
		if (!bidAmountAsNumber) return;
		setError(undefined);
		setStep(Step.LOADING);
		setStatusText(StatusText.WAITING_FOR_SIGNATURE);

		try {
			if (sdk?.zauction === undefined) {
				console.warn('No zAuctionInstance');
				return;
			}

			try {
				await sdk.zauction.placeBid(
					{
						domainId: domainId,
						bidAmount: ethers.utils.parseEther(bidAmountAsNumber.toString()),
					},
					provider.getSigner(),
				);
			} catch (e: any) {
				console.warn(e);
				throw new Error('Rejected by wallet');
			}
			setStep(Step.COMPLETE);
		} catch (e: any) {
			setError(e.message);
			setStep(Step.CONFIRM);
		}
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
