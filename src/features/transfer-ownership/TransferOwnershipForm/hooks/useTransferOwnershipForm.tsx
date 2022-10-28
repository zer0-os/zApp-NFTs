import { useState } from 'react';

import { Step } from '../TransferOwnershipForm.constants';
import {
	isValidTransferAddress,
	getInputErrorMessage,
} from '../TransferOwnershipForm.utils';

import { useWeb3 } from '../../../../lib/hooks/useWeb3';
import { useZnsSdk } from '../../../../lib/hooks/useZnsSdk';
import { getDomainId } from '../../../../lib/util/domains/domains';
import { useDomainData } from '../../../../lib/hooks/useDomainData';
import { TransactionErrors } from '../../../../lib/constants/messages';
// import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';
import { ContractTransaction } from 'ethers';

export type UseTransferOwnershipFormReturn = {
	step: Step;
	error: string;
	onConfirmInput: (address: string) => void;
	onConfirmTransaction: () => void;
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
	// const { executeTransaction } = useTransaction();
	const { data: domain } = useDomainData(domainId);

	const [error, setError] = useState<string>();
	const [step, setStep] = useState<Step>(Step.DETAILS);
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
	// const onConfirmTransaction = () => {
	// 	setError(undefined);
	// 	return executeTransaction(
	// 		sdk.transferDomainOwnership,
	// 		[walletAddress, domainId, provider.getSigner()],
	// 		{
	// 			onStart: () => setStep(Step.TRANSACTION_APPROVAL),
	// 			onProcessing: () => setStep(Step.TRANSACTION_IN_PROGRESS),
	// 			onSuccess: () => setStep(Step.COMPLETE),
	// 			onError: (error: any) => {
	// 				setError(error.message);
	// 				setStep(Step.CONFIRM);
	// 			},

	// 			invalidationKeys: [['user', { account, domainId, walletAddress }]],
	// 		},
	// 	);
	// };
	const onConfirmTransaction = () => {
		(async () => {
			setError(undefined);
			setStep(Step.TRANSACTION_APPROVAL);

			try {
				let tx: ContractTransaction;

				try {
					tx = await sdk.transferDomainOwnership(
						walletAddress,
						domainId,
						provider.getSigner(),
					);
				} catch {
					throw TransactionErrors.PRE_WALLET;
				}
				setStep(Step.TRANSACTION_IN_PROGRESS);
				try {
					await tx.wait();
				} catch {
					throw TransactionErrors.POST_WALLET;
				}
				setStep(Step.COMPLETE);
			} catch (e: any) {
				setError(e.message);
				setStep(Step.CONFIRM);
			}
		})();
	};

	return {
		step,
		error,
		onConfirmInput,
		onConfirmTransaction,
	};
};
