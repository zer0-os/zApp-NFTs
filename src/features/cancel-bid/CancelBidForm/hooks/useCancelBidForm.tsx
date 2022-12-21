import { useState } from 'react';

import { useWeb3, useZnsSdk } from '../../../../lib/hooks';
import { useCancelBidData } from '../../useCancelBidData';
import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';

import { Step } from '../FormSteps/hooks';

export enum ZAuctionVersionType {
	V1 = '1.0',
	V2 = '2.0',
}

enum StatusText {
	PROCESSING_BID = 'Cancelling your bid. This may take up to 20 mins... Please do not close this window or refresh the page.',
	WAITING_FOR_APPROVAL_VERSION_1 = 'Waiting for signature approval. You should receive a request in your wallet.',
	WAITING_FOR_APPROVAL_VERSION_2 = 'Waiting for signature and transaction approval. You should receive two requests in your wallet.',
}

export type UseCancelBidFormReturn = {
	step: Step;
	error: string;
	statusText: string;
	isLeadingBid: boolean;
	onNext: () => void;
	onCancelBid: () => void;
};

/**
 * Drives the logic behind the cancel bid form.
 */
export const useCancelBidForm = (zna: string): UseCancelBidFormReturn => {
	const sdk = useZnsSdk();

	const { account, provider } = useWeb3();
	const { executeTransaction } = useTransaction();
	const { domainId, isLeadingBid, highestBid: bid } = useCancelBidData(zna);

	const [error, setError] = useState<string>();
	const [step, setStep] = useState<Step>(Step.DETAILS);
	const [statusText, setStatusText] = useState<string>();

	const bidVersion = bid?.version;
	const cancelBidOnChain = bidVersion === ZAuctionVersionType.V2;
	const versionWaitingStatus =
		bidVersion === ZAuctionVersionType.V1
			? StatusText.WAITING_FOR_APPROVAL_VERSION_1
			: StatusText.WAITING_FOR_APPROVAL_VERSION_2;

	const onNext = () => {
		setStep(Step.CONFIRM);
	};

	const onCancelBid = () => {
		setError(undefined);
		return executeTransaction(
			sdk.zauction.cancelBid,
			[bid, cancelBidOnChain, provider.getSigner()],
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

				invalidationKeys: [['user', { account, domainId, bid }]],
			},
		);
	};

	return {
		step,
		error,
		statusText,
		isLeadingBid,
		onNext,
		onCancelBid,
	};
};
