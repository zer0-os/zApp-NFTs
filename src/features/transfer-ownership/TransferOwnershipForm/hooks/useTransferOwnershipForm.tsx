import { useState } from 'react';

import {
	isValidTransferAddress,
	getInputErrorMessage,
} from '../TransferOwnershipForm.utils';
import { Step } from '../FormSteps/hooks';
import { useWeb3 } from '../../../../lib/hooks/useWeb3';
import { useZnsSdk } from '../../../../lib/hooks/useZnsSdk';
import { getDomainId } from '../../../../lib/util/domains/domains';
import { useDomainData } from '../../../../lib/hooks/useDomainData';
import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';

enum StatusText {
	TRANSACTION_ALERT = 'This transaction is about to be seared upon the blockchain. There’s no going back.',
	WAITING_FOR_SIGNATURE = '\n\nPlease accept wallet transaction..',
	PROCESSING_TRANSFER = '\n\nYour transaction is being processed...',
}

export type UseTransferOwnershipFormReturn = {
	step: Step;
	error: string;
	statusText: string;
	onConfirmInput: (address: string) => void;
	onConfirmTransfer: () => void;
};

/**
 * Drives the logic behind the transfer ownership form.
 */
export const useTransferOwnershipForm = (
	zna: string,
): UseTransferOwnershipFormReturn => {
	const sdk = useZnsSdk();
	const domainId = getDomainId(zna);

	const { account, provider } = useWeb3();
	const { executeTransaction } = useTransaction();
	const { data: domain } = useDomainData(domainId);

	const [error, setError] = useState<string>();
	const [step, setStep] = useState<Step>(Step.DETAILS);
	const [statusText, setStatusText] = useState<string>();
	const [walletAddress, setWalletAddress] = useState<string>();

	/**
	 * Checks wallet address is valid and progresses to the next step.
	 */
	const onConfirmInput = (address: string) => {
		setError(undefined);

		if (isValidTransferAddress(address, account, domain?.owner)) {
			setStep(Step.CONFIRM);
			setWalletAddress(address);
		} else {
			setError(getInputErrorMessage(address, account, domain?.owner));
		}
	};

	/**
	 * Triggers a series of wallet confirmations, and progresses steps accordingly.
	 */
	const onConfirmTransfer = () => {
		setError(undefined);
		return executeTransaction(
			sdk.transferDomainOwnership,
			[walletAddress, domainId, provider.getSigner()],
			{
				onStart: () => {
					setStep(Step.LOADING);
					setStatusText(
						`${StatusText.TRANSACTION_ALERT} ${StatusText.WAITING_FOR_SIGNATURE}`,
					);
				},
				onProcessing: () =>
					setStatusText(
						`${StatusText.TRANSACTION_ALERT} ${StatusText.PROCESSING_TRANSFER}`,
					),
				onSuccess: () => setStep(Step.COMPLETE),
				onError: (error: any) => {
					setError(error.message);
					setStep(Step.CONFIRM);
				},

				invalidationKeys: [['user', { account, domainId, walletAddress }]],
			},
		);
	};

	return {
		step,
		error,
		statusText,
		onConfirmInput,
		onConfirmTransfer,
	};
};
