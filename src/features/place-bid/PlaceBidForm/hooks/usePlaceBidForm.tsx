import { useState } from 'react';

import { usePlaceBidData } from '../../usePlaceBidData';
import { useWeb3 } from '../../../../lib/hooks/useWeb3';
import { useZnsSdk } from '../../../../lib/hooks/useZnsSdk';
import { useZAuctionCheck } from '../../../../lib/hooks/useZAuctionCheck';
import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';

import { Step } from '../PlaceBidForm.constants';

export type UsePlaceBidFormReturn = {
	step: Step;
	error: string;
	onZAuctionCheck: () => void;
	onZAuctionApprove: () => void;
	onConfirmPlaceBid: () => void;
};

/**
 * Drives the logic behind the place bid form.
 */
export const usePlaceBidForm = (
	domainId: string,
	bidAmount: string,
): UsePlaceBidFormReturn => {
	const [error, setError] = useState<string>();
	const [step, setStep] = useState<Step>(Step.DETAILS);

	const sdk = useZnsSdk();
	const { account, provider } = useWeb3();
	const { executeTransaction } = useTransaction();
	const { paymentTokenForDomain } = usePlaceBidData(domainId);
	const { data: isZAuctionCheckRequired, error: zAuctionCheckError } =
		useZAuctionCheck(account, paymentTokenForDomain);

	const onZAuctionCheck = async () => {
		setError(undefined);
		setStep(Step.ZAUCTION_CHECK);

		// set timeout to prevent container jolt
		await new Promise((r) => setTimeout(r, 1500));

		if (isZAuctionCheckRequired) {
			setStep(Step.ZAUCTION_APPROVE);
		} else if (zAuctionCheckError) {
			setError('Failed to check zAuction approval status');
			setStep(Step.DETAILS);
		} else {
			setStep(Step.CONFIRM_BID);
		}
	};

	const onZAuctionApprove = () => {
		setError(undefined);
		return executeTransaction(
			sdk.zauction.approveZAuctionToSpendPaymentToken,
			[paymentTokenForDomain, provider.getSigner()],
			{
				onStart: () => setStep(Step.WAITING_FOR_WALLET),
				onProcessing: () => setStep(Step.PROCESSING),
				onSuccess: () => setStep(Step.CONFIRM_BID),
				onError: (error: any) => {
					setError(error.message);
					setStep(Step.ZAUCTION_APPROVE);
				},
				// TODO: correct keys
				invalidationKeys: [['user', { account, paymentTokenForDomain }]],
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
					bidAmount,
				},
				provider.getSigner(),
			],
			{
				onStart: () => setStep(Step.WAITING_FOR_WALLET),
				onProcessing: () => setStep(Step.PROCESSING),
				onSuccess: () => setStep(Step.COMPLETE),
				onError: (error: any) => {
					setError(error.message);
					setStep(Step.CONFIRM_BID);
				},
				// TODO: correct keys
				invalidationKeys: [['user', { account, domainId, bidAmount }]],
			},
		);
	};

	return {
		step,
		error,
		onZAuctionCheck,
		onZAuctionApprove,
		onConfirmPlaceBid,
	};
};
