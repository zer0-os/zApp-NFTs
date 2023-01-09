import { useState } from 'react';

import { useDomainSettingsData } from '../../useDomainSettingsData';
import { useWeb3, useZnsSdk } from '../../../../lib/hooks';
import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';

import { Step } from '../FormSteps/hooks';

export type UseDomainSettingsFormReturn = {
	step: Step;
	error: string;
	statusText: string;
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
	const [error, setError] = useState<string>();
	const [statusText, setStatusText] = useState<string>();

	return {
		step,
		error,
		statusText,
	};
};
