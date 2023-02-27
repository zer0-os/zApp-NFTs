import { ReactNode, useCallback, useState } from 'react';

import {
	steps,
	FormStep,
	FieldValues,
	DetailsFormSubmit,
	ConfirmActionType,
} from '../DomainSettings.types';
import { useDomainSettingsData } from '.';
import { useWeb3, useZnsSdk } from '../../../lib/hooks';
import {
	CONFIRM_STEP_HEADER_TEXT,
	LOADING_TEXT_CONTENT,
} from '../DomainSettings.constants';
import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';

import { ConfirmForm, DetailsForm } from '../Steps';
import { Step, Wizard } from '@zero-tech/zui/components';

export type UseDomainSettingsFormFormReturn = {
	stepId: string;
	formHeader: string;
	formContent: ReactNode;
	isTransactionLoading: boolean;
	onStepBarUpdate: (step: Step) => void;
};

export const useDomainSettingsForm = (
	zna: string,
	onClose: () => void,
): UseDomainSettingsFormFormReturn => {
	const sdk = useZnsSdk();

	const { account, provider } = useWeb3();
	const { executeTransaction } = useTransaction();
	const { domainId, metadata, isMetadataLocked } = useDomainSettingsData(zna);

	const [stepId, setStepId] = useState(steps[0].id);
	const [errorText, setErrorText] = useState<string>();
	const [loadingStatusText, setLoadingStatusText] = useState<string>();
	const [formHeader, setFormHeader] = useState<string>('My Domain Settings');
	const [isTransactionLoading, setIsTransactionLoading] = useState<boolean>();
	const [confirmActionType, setConfirmActionType] =
		useState<ConfirmActionType>();

	const [details, setDetails] = useState<DetailsFormSubmit>();

	// Set metadata form details
	const onSubmitMetadata = ({
		title,
		description,
		isMintable,
		isBiddable,
		gridViewByDefault,
		customDomainHeader,
		customDomainHeaderValue,
	}: FieldValues): void => {
		setDetails({
			attributes: metadata?.attributes,
			title,
			description,
			image: metadata?.image,
			image_full: metadata?.image_full,
			previewImage: metadata?.previewImage,
			animation_url: metadata?.animation_url,
			stakingRequests: metadata?.stakingRequests,
			isBiddable,
			isMintable,
			gridViewByDefault,
			customDomainHeader,
			customDomainHeaderValue,
		});
	};

	const onCheckMetadataLockStatus = useCallback(async () => {
		const isDomainMetadataLocked = await sdk.isDomainMetadataLocked(
			domainId,
			provider.getSigner(),
		);

		return isDomainMetadataLocked;
	}, [domainId, provider]);

	// Transaction handlers
	const handleTransactionStart = (onLoadingHeader: string) => {
		setIsTransactionLoading(true);
		setLoadingStatusText('Waiting approval from your wallet...');
		setFormHeader(onLoadingHeader);
	};

	const handleTransactionProcessing = (onLoadingText: string) => {
		setLoadingStatusText(onLoadingText);
	};

	const handleTransactionSuccess = () => {
		setIsTransactionLoading(false);
		setStepId(steps[2].id);
		onCheckMetadataLockStatus();
	};

	const handleTransactionError = (errorMessage: string) => {
		setIsTransactionLoading(false);
		setErrorText(errorMessage);
		setStepId(stepId === FormStep.COMPLETE ? steps[2].id : steps[0].id);
	};

	const getSdkAction = (action: ConfirmActionType) => {
		if (
			action === ConfirmActionType.UNLOCK ||
			action === ConfirmActionType.LOCK
		) {
			return sdk.lockDomainMetadata;
		} else if (action === ConfirmActionType.SAVE_AND_LOCK) {
			return sdk.setAndLockDomainMetadata;
		} else {
			return sdk.setDomainMetadata;
		}
	};

	const onStepBarUpdate = (step: Step) => {
		setStepId(step.id);
	};

	const onRestart = () => {
		setStepId(steps[0].id);
	};

	// Executes the confirm form transaction.
	const onSubmitTransaction = (action: ConfirmActionType) => {
		setErrorText(undefined);

		const { loadingHeader, loadingBody } = LOADING_TEXT_CONTENT[action];

		const sdkAction = getSdkAction(action);

		return executeTransaction(
			sdkAction,
			[
				domainId,
				action === ConfirmActionType.UNLOCK || action === ConfirmActionType.LOCK
					? !isMetadataLocked
					: details,
				provider.getSigner(),
			],
			{
				onStart: () => handleTransactionStart(loadingHeader),
				onProcessing: () => handleTransactionProcessing(loadingBody),
				onSuccess: () => handleTransactionSuccess(),
				onError: (error: any) => handleTransactionError(error.message),

				invalidationKeys: [
					['user', { account, domainId, details, isMetadataLocked }],
				],
			},
		);
	};

	const onSubmitFormStep = (action: ConfirmActionType) => {
		const { confirmStepHeader } = CONFIRM_STEP_HEADER_TEXT[action];

		setConfirmActionType(action);

		if (stepId === FormStep.DETAILS) {
			setFormHeader(confirmStepHeader);
			setStepId(steps[1].id);
		} else {
			onSubmitTransaction(action);
		}
	};

	// Form content structure
	let formContent: ReactNode;

	switch (stepId) {
		case FormStep.DETAILS:
			formContent = (
				<DetailsForm
					zna={zna}
					stepId={stepId}
					errorText={errorText}
					onSubmitMetadata={onSubmitMetadata}
					onSubmitFormStep={(action: ConfirmActionType) =>
						onSubmitFormStep(action)
					}
				/>
			);
			break;

		case FormStep.CONFIRM:
			formContent = !isTransactionLoading ? (
				<ConfirmForm
					onRestart={onRestart}
					confirmActionType={confirmActionType}
					onSubmitFormStep={() => onSubmitFormStep(confirmActionType)}
				/>
			) : (
				<Wizard.Loading message={loadingStatusText} />
			);
			break;

		case FormStep.COMPLETE:
			formContent = !isTransactionLoading ? (
				<DetailsForm
					zna={zna}
					stepId={stepId}
					onClose={onClose}
					onRestart={onRestart}
					errorText={errorText}
					confirmActionType={confirmActionType}
					onSubmitFormStep={(action: ConfirmActionType) =>
						onSubmitFormStep(action)
					}
				/>
			) : (
				<Wizard.Loading message={loadingStatusText} />
			);
			break;
	}

	return {
		stepId,
		formHeader,
		formContent,
		isTransactionLoading,
		onStepBarUpdate,
	};
};
