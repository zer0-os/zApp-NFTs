import { useState, useCallback } from 'react';

import { Step } from '../FormSteps/hooks';
import { steps } from '../DomainSettingsForm.types';
import { useWeb3, useZnsSdk } from '../../../../lib/hooks';
import { useDomainSettingsData } from '../../useDomainSettingsData';
import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';

export type UseDomainSettingsFormReturn = {
	step: Step;
	stepId: string;
	error: string;
	statusText: string;
	onBack: () => void;
	onChangeStep: () => void;
	onLockMetadataStatus: () => void;
};

/**
 * Drives the logic behind the domain settings form.
 */
export const useDomainSettingsForm = (
	zna: string,
): UseDomainSettingsFormReturn => {
	const sdk = useZnsSdk();

	const { account, provider } = useWeb3();
	const { executeTransaction } = useTransaction();
	const { domainId, localState, localActions } = useDomainSettingsData(zna);

	const [step, setStep] = useState<Step>(Step.DETAILS);
	const [stepId, setStepId] = useState<string>(steps[0].id);
	const [error, setError] = useState<string>();
	const [statusText, setStatusText] = useState<string>();

	const onChangeStep = () => {
		setStep(Step.CONFIRM);
		setStepId(steps[1].id);
	};

	const onBack = () => {
		setStep(Step.DETAILS);
	};

	const onLockMetadataStatus = () => {
		const lockStatus = localState.isMetadataLocked;

		setError(undefined);

		return executeTransaction(
			sdk.lockDomainMetadata,
			[domainId, !lockStatus, provider.getSigner()],
			{
				onStart: () => {
					setStep(Step.LOADING);
					setStatusText('Waiting approval from your wallet...');
				},
				onProcessing: () =>
					setStatusText(
						lockStatus
							? 'Unlocking metadata... This may take up to 20 mins. Do not close this window or refresh your browser...'
							: 'Saving & locking metadata... \nThis may take up to 20 mins. Do not close this window or refresh your browser...',
					),
				onSuccess: () => {
					setStep(Step.COMPLETE);
					setStepId(steps[2].id);
				},
				onError: (error: any) => {
					setError(error.message);
					setStep(Step.DETAILS);
				},

				invalidationKeys: [['user', { account, domainId, lockStatus }]],
			},
		);
	};

	return {
		step,
		stepId,
		error,
		statusText,
		onBack,
		onChangeStep,
		onLockMetadataStatus,
	};
};
