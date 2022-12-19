import { useState } from 'react';

import { useWeb3, useZnsSdk } from '../../../../lib/hooks';
import { useBuyNowData } from '../../useBuyNowData';
import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';

import { Step } from '../FormSteps/hooks';
import { useZAuctionCheckTokensByDomain } from '../../../../lib/hooks/useZAuctionCheckTokensByDomain';

enum StatusText {
	APPROVING_ZAUCTION = 'Approving zAuction. This may take up to 20 mins... Please do not close this window or refresh the page.',
	CHECK_ZAUCTION = 'Checking status of zAuction approval...',
	PROCESSING_BUY_NOW = 'Buying NFT. This may take up to 20 mins... Please do not close this window or refresh the page.',
	WAITING_FOR_APPROVAL = 'Waiting for approval from your wallet...',
	WAITING_FOR_SIGNATURE = 'Waiting for buy now approval to be signed by wallet...',
}

enum ErrorText {
	FAILED_ZAUCTION_CHECK = 'Failed to check zAuction approval status',
}

export type UseBuyNowFormReturn = {
	step: Step;
	error: string;
	statusText: string;
	onCheckZAuction: () => void;
	onApproveZAuction: () => void;
	onConfirmBuyNow: () => void;
};

/**
 * Drives the logic behind the buy now form.
 */
export const useBuyNowForm = (zna: string): UseBuyNowFormReturn => {
	const sdk = useZnsSdk();

	const { account, provider } = useWeb3();
	const { executeTransaction } = useTransaction();
	const { domainId, paymentTokenId, buyNowPrice } = useBuyNowData(zna);

	const { data: isZAuctionCheckRequired, error: zAuctionCheckError } =
		useZAuctionCheckTokensByDomain(account, domainId, buyNowPrice);

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
			setStep(Step.DETAILS);
			onConfirmBuyNow();
		}
	};

	const onApproveZAuction = () => {
		setError(undefined);
		return executeTransaction(
			sdk.zauction.approveZAuctionToSpendTokensByDomain,
			[domainId, provider.getSigner()],
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

				invalidationKeys: [['user', { account, domainId }]],
			},
		);
	};

	const onConfirmBuyNow = () => {
		setError(undefined);
		return executeTransaction(
			sdk.zauction.buyNow,
			[
				{
					amount: buyNowPrice,
					tokenId: domainId,
					paymentToken: paymentTokenId,
				},
				provider.getSigner(),
			],
			{
				onStart: () => {
					setStep(Step.LOADING);
					setStatusText(StatusText.WAITING_FOR_SIGNATURE);
				},
				onProcessing: () => setStatusText(StatusText.PROCESSING_BUY_NOW),
				onSuccess: () => setStep(Step.COMPLETE),
				onError: (error: any) => {
					setError(error.message);
					setStep(Step.DETAILS);
				},

				invalidationKeys: [['user', { account, domainId, buyNowPrice }]],
			},
		);
	};

	return {
		step,
		error,
		statusText,
		onCheckZAuction,
		onApproveZAuction,
		onConfirmBuyNow,
	};
};
