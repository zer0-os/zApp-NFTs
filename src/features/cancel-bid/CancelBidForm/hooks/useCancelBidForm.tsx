import { useState } from 'react';

import { useWeb3 } from '../../../../lib/hooks/useWeb3';
import { useCancelBidData } from '../../useCancelBidData';
import { useZnsSdk } from '../../../../lib/hooks/useZnsSdk';
import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';

import { Step } from '../FormSteps/hooks';

export enum ZAuctionVersionType {
	V1 = '1.0',
	V2 = '2.0',
}

enum StatusText {
	PROCESSING_BID = 'A',
	WAITING_FOR_APPROVAL = 'Waiting for approval from your wallet...',
	WAITING_FOR_SIGNATURE = 'Waiting for transaction to be confirmed from wallet...',
}

export type UseCancelBidFormReturn = {
	step: Step;
	error: string;
	statusText: string;
	onNext: () => void;
	onCancelBid: () => void;
};

/**
 * Drives the logic behind the cancel bid form.
 */
export const useCancelBidForm = (
	zna: string,
	bidNonce: string,
	bidVersion: ZAuctionVersionType,
): UseCancelBidFormReturn => {
	const sdk = useZnsSdk();

	const { account, provider } = useWeb3();
	const { executeTransaction } = useTransaction();
	const { domainId } = useCancelBidData(zna);

	const [error, setError] = useState<string>();
	const [step, setStep] = useState<Step>(Step.DETAILS);
	const [statusText, setStatusText] = useState<string>();

	const versionWaitingStatus =
		bidVersion === ZAuctionVersionType.V1
			? 'Waiting for signature approval. You should receive a request in your wallet.'
			: 'Waiting for signature and transaction approval. You should receive two requests in your wallet.';

	// v1 bid or v2 bid
	const cancelBidOnChain = bidVersion === ZAuctionVersionType.V1 ? false : true;

	const onNext = () => {
		setStep(Step.CONFIRM);
	};

	const onCancelBid = () => {
		setError(undefined);
		return executeTransaction(
			sdk.zauction.cancelBid,
			[bidNonce, cancelBidOnChain, provider.getSigner()],
			{
				onStart: () => {
					setStep(Step.LOADING);
					setStatusText(versionWaitingStatus);
				},
				onProcessing: () => setStatusText(StatusText.PROCESSING_BID),
				onSuccess: () => setStep(Step.COMPLETE),
				onError: (error: any) => {
					setError(error.message);
					setStep(Step.CONFIRM);
				},

				invalidationKeys: [['user', { account, domainId, bidNonce }]],
			},
		);
	};

	return {
		step,
		error,
		statusText,
		onNext,
		onCancelBid,
	};
};
