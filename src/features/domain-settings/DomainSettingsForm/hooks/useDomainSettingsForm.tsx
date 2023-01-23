import { useState } from 'react';

import { Step } from '../FormSteps/hooks';
import { steps } from '../DomainSettingsForm.types';
import { useWeb3, useZnsSdk } from '../../../../lib/hooks';
import { useDomainSettingsData } from '../../useDomainSettingsData';
import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';

export type UseDomainSettingsFormReturn = {
	step: Step;
	errorText: string;
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
	const { domainId, localState } = useDomainSettingsData(zna);

	const [step, setStep] = useState<Step>(Step.DETAILS);
	const [errorText, setErrorText] = useState<string>();
	const [statusText, setStatusText] = useState<string>();

	const onChangeStep = () => {
		setStep(Step.CONFIRM);
	};

	const onBack = () => {
		setStep(Step.DETAILS);
	};

	const onLockMetadataStatus = () => {
		const lockStatus = localState.isMetadataLocked;

		setErrorText(undefined);

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
				},
				onError: (error: any) => {
					setErrorText(error.message);
					setStep(Step.DETAILS);
				},

				invalidationKeys: [['user', { account, domainId, lockStatus }]],
			},
		);
	};

	return {
		step,
		errorText,
		statusText,
		onBack,
		onChangeStep,
		onLockMetadataStatus,
	};
};
