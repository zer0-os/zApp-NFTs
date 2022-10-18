import { useState } from 'react';

import { Step } from '../TransferOwnershipForm.constants';
import {
	isValidTransferAddress,
	getInputErrorMessage,
} from '../TransferOwnershipForm.utils';

import { useZnsSdk } from '../../../../lib/hooks/useZnsSdk';
import { useWeb3 } from '../../../../lib/hooks/useWeb3';
import { TransactionErrors } from '../../../../lib/constants/messages';
import { useDataContainer } from '../../../../lib/hooks/useDataContainer';
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
	domainId: string,
): UseTransferOwnershipFormReturn => {
	const sdk = useZnsSdk();
	const { account, provider } = useWeb3();
	const { domain } = useDataContainer(domainId);
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
