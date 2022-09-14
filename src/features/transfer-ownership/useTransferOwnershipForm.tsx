import { useState } from 'react';

import { TransferError } from './TransferOwnership.types';
import { ErrorType, Step } from './TransferOwnership.constants';
import { isValid, handleInputError } from './TransferOwnership.utils';

import { useZnsSdk } from '../../lib/hooks/useZnsSdk';
import { useWeb3 } from '../../lib/hooks/useWeb3';
import { TransactionErrors } from '../../lib/constants/messages';
import { ContractTransaction } from 'ethers';

/**
 * Drives the logic behind the transfer ownership form.
 */
export const useTransferOwnershipForm = (domainId: string) => {
	const sdk = useZnsSdk();
	const { account, provider } = useWeb3();
	const [error, setError] = useState<TransferError>();
	const [step, setStep] = useState<Step>(Step.DETAILS);
	const [walletAddress, setWalletAddress] = useState<string>();

	/**
	 * Checks wallet address is valid and progresses to the next step.
	 */
	const onConfirmInput = (address: string) => {
		setError(undefined);

		if (isValid(address, account)) {
			setStep(Step.CONFIRM);
			setWalletAddress(address);
		} else {
			setError({
				message: handleInputError(address, account),
				type: ErrorType.INPUT,
			});
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
				setError({ message: e.message, type: ErrorType.TRANSACTION });
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
