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
	onChangeStep: (step: StepType) => void;
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

	const [step, setStep] = useState<Step>(Step.DETAILS);
	const [stepId, setStepId] = useState<string>(steps[0].id);
	const [error, setError] = useState<string>();
	const [statusText, setStatusText] = useState<string>();

	const onChangeStep = (step: StepType): void => {
		setStepId(step.id);
	};

	return {
		step,
		stepId,
		error,
		statusText,
		onChangeStep,
	};
};
