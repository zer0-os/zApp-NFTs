import { useState } from 'react';

import { Step } from '../FormSteps/hooks';
import { useSetBuyNowData } from '../../useSetBuyNowData';
import {
	useWeb3,
	useZnsSdk,
	useZAuctionCheckTransferNftsByDomain,
} from '../../../../lib/hooks';
import { ethers } from 'ethers';
import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';

enum StatusText {
	APPROVING_ZAUCTION = 'Approving zAuction. This may take up to 20 mins... Please do not close this window or refresh the page.',
	CHECK_ZAUCTION = 'Checking status of zAuction approval...',
	PROCESSING_SET_BUY_NOW = 'Setting buy now. This may take up to 20 mins... Please do not close this window or refresh the page.',
	WAITING_FOR_APPROVAL = 'Waiting for approval from your wallet...',
	WAITING_FOR_SIGNATURE = 'Waiting for set buy now approval to be signed by wallet...',
}

enum ErrorText {
	FAILED_ZAUCTION_CHECK = 'Failed to check zAuction approval status',
}

export type UseSetBuyNowFormReturn = {
	step: Step;
	error: string;
	statusText: string;
	buyNowAmount: string;
	setBuyNowAmount: (bidAmount: string) => void;
	onCheckZAuction: () => void;
	onApproveZAuction: () => void;
	onConfirmSetBuyNow: () => void;
};

/**
 * Drives the logic behind the set buy now form.
 */
export const useSetBuyNowForm = (zna: string): UseSetBuyNowFormReturn => {
	const sdk = useZnsSdk();

	const { account, provider } = useWeb3();
	const { executeTransaction } = useTransaction();
	const { domainId } = useSetBuyNowData(zna);

	const { data: isZAuctionCheckRequired, error: zAuctionCheckError } =
		useZAuctionCheckTransferNftsByDomain(domainId, account);

	const [error, setError] = useState<string>();
	const [step, setStep] = useState<Step>(Step.DETAILS);
	const [buyNowAmount, setBuyNowAmount] = useState<string>('');
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
			sdk.zauction.approveZAuctionToTransferNftsByDomain,
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

	const onConfirmSetBuyNow = () => {
		const buyNowAmountAsNumber = Number(buyNowAmount);

		setError(undefined);
		return executeTransaction(
			sdk.zauction.setBuyNowPrice,
			[
				{
					amount: ethers.utils.parseEther(buyNowAmountAsNumber.toString()),
					tokenId: domainId,
				},
				provider.getSigner(),
			],
			{
				onStart: () => {
					setStep(Step.LOADING);
					setStatusText(StatusText.WAITING_FOR_SIGNATURE);
				},
				// buyNowAmountAsNumber
				onProcessing: () => setStatusText(StatusText.PROCESSING_SET_BUY_NOW),
				onSuccess: () => setStep(Step.COMPLETE),
				onError: (error: any) => {
					setError(error.message);
					setStep(Step.CONFIRM);
				},

				invalidationKeys: [['user', { account, domainId, buyNowAmount }]],
			},
		);
	};

	return {
		step,
		error,
		statusText,
		buyNowAmount,
		setBuyNowAmount,
		onCheckZAuction,
		onApproveZAuction,
		onConfirmSetBuyNow,
	};
};
