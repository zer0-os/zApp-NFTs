import { useState } from 'react';

import { useWeb3 } from '../../../../lib/hooks/useWeb3';
import { useZnsSdk } from '../../../../lib/hooks/useZnsSdk';
import { usePaymentTokenForDomain } from '../../../../lib/hooks/usePaymentTokenForDomain';
import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';

import { Step } from '../PlaceBidForm.constants';

export type UsePlaceBidFormReturn = {
	step: Step;
	error: string;
	onZAuctionCheck: () => void;
	onZAuctionApprove: () => void;
};

/**
 * Drives the logic behind the place bid form.
 */
export const usePlaceBidForm = (domainId: string): UsePlaceBidFormReturn => {
	const sdk = useZnsSdk();
	const { account, provider } = useWeb3();
	const { executeTransaction } = useTransaction();
	const { data: paymentTokenForDomain } = usePaymentTokenForDomain(domainId);

	const [error, setError] = useState<string>();
	const [step, setStep] = useState<Step>(Step.CONFIRM_BID);

	/**
	 * Controls modal state and calls SDK methods for what happens
	 * when the modal checks zAuction approval status
	 * @returns void
	 */
	const onZAuctionCheck = () => {
		if (!sdk || !account) {
			return;
		}
		setError(undefined);
		setStep(Step.ZAUCTION_CHECK);
		(async () => {
			try {
				const needsApproval =
					await sdk.zauction.needsToApproveZAuctionToSpendTokensByPaymentToken(
						account,
						paymentTokenForDomain,
						'1000000000',
					);

				// Timeout to prevent jolt
				await new Promise((r) => setTimeout(r, 1500));
				if (needsApproval) {
					setStep(Step.ZAUCTION_APPROVE);
				} else {
					setStep(Step.CONFIRM_BID);
				}
			} catch (e) {
				setError('Failed to check zAuction approval status');
				setStep(Step.DETAILS);
			}
		})();
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

	return { step, error, onZAuctionCheck, onZAuctionApprove };
};
