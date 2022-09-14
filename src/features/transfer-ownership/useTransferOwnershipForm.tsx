import { useState } from 'react';

import { useZnsSdk } from '../../lib/hooks/useZnsSdk';
import { useWeb3 } from '../../lib/hooks/useWeb3';
import { isValidEthAddress } from '../../lib/util/address/address';
import { TransactionErrors } from '../../lib/constants/messages';

import { TransferOwnershipFormStep } from './TransferOwnership.constants';

/**
 * Drives the logic behind the transfer ownership form.
 */
export const useTransferOwnershipForm = (domainId: string) => {
	const sdk = useZnsSdk();
	const { account, provider } = useWeb3();

	const [walletAddress, setWalletAddress] = useState<string>();
	const [error, setError] = useState<string>();
	const [helperText, setHelperText] = useState<string>();
	const [step, setStep] = useState<TransferOwnershipFormStep>(
		TransferOwnershipFormStep.DETAILS,
	);

	const isOwnersAddress = (inputAdrressValue: string) =>
		inputAdrressValue.toLowerCase() === account.toLowerCase();

	const isValid = (inputAdrressValue: string) =>
		isValidEthAddress(inputAdrressValue);

	/**
	 * Checks wallet address is valid and progresses to the next step.
	 */
	// todo: improve helperText/setHelperText
	const onConfirmAddressInput = (inputAdrressValue: string) => {
		setError(undefined);

		if (isValid(inputAdrressValue) && !isOwnersAddress(inputAdrressValue)) {
			setStep(TransferOwnershipFormStep.CONFIRM);
			setWalletAddress(inputAdrressValue);
		} else if (
			isValid(inputAdrressValue) &&
			isOwnersAddress(inputAdrressValue)
		) {
			setHelperText('This address already owns this domain');
		} else {
			setHelperText('Please enter a valid Ethereum wallet address');
		}
	};

	/**
	 * Triggers a series of wallet confirmations, and progresses steps accordingly.
	 */
	const onConfirmTransfer = () => {
		(async () => {
			setStep(TransferOwnershipFormStep.TRANSACTION_APPROVAL);
			setError(undefined);

			try {
				try {
					const tx = await sdk.transferDomainOwnership(
						walletAddress,
						domainId,
						provider.getSigner(),
					);
					try {
						setStep(TransferOwnershipFormStep.TRANSACTION_IN_PROGRESS);
						await tx.wait();
						setStep(TransferOwnershipFormStep.COMPLETE);
					} catch {
						setStep(TransferOwnershipFormStep.CONFIRM);
						throw TransactionErrors.POST_WALLET;
					}
				} catch {
					setStep(TransferOwnershipFormStep.CONFIRM);
					throw TransactionErrors.PRE_WALLET;
				}
			} catch (e: any) {
				setError(e.message);
				setStep(TransferOwnershipFormStep.CONFIRM);
			}
		})();
	};

	return {
		step,
		error,
		helperText,
		setHelperText,
		onConfirmAddressInput,
		onConfirmTransfer,
	};
};