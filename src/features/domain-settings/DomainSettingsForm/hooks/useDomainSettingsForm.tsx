import { useState } from 'react';

import { Step } from '../FormSteps/hooks';
import { steps } from '../DomainSettingsForm.types';
import { useWeb3, useZnsSdk } from '../../../../lib/hooks';
import { useDomainSettingsData } from '../../useDomainSettingsData';
import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';

import { Step as StepType } from '@zero-tech/zui/components';

export type UseDomainSettingsFormReturn = {
	step: Step;
	stepId: string;
	error: string;
	statusText: string;
	onBack: () => void;
	onChangeStep: () => void;
	onLockMetadata: () => void;
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
	const { domainId } = useDomainSettingsData(zna);

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

	// we can pass true/false in here (something like isLocking) and add a ternary for the status text either locking or unlocking

	const onLockMetadata = () => {
		setError(undefined);

		return executeTransaction(
			sdk.lockDomainMetadata,
			[domainId, false, provider.getSigner()],
			{
				onStart: () => {
					setStep(Step.LOADING);
					setStatusText('Waiting approval from your wallet...');
				},
				onProcessing: () =>
					setStatusText(
						'Saving & locking metadata... \nThis may take up to 20 mins. Do not close this window or refresh your browser...',
					),
				onSuccess: () => {
					setStep(Step.COMPLETE);
					setStepId(steps[2].id);
				},

				invalidationKeys: [['user', { account, domainId }]],
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
		onLockMetadata,
	};
};
