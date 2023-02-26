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
import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';

import { ConfirmStep, DetailsStep } from '../Steps';
import { Step, Wizard } from '@zero-tech/zui/components';

export type UseDomainSettingsFormFormReturn = {
	stepId: string;
	formHeader: string;
	formContent: ReactNode;
	isTransactionLoading: boolean;
	onStepUpdate: (step: Step) => void;
};

export const useDomainSettingsForm = (
	zna: string,
	onClose: () => void,
): UseDomainSettingsFormFormReturn => {
	const sdk = useZnsSdk();

	const { account, provider } = useWeb3();
	const { executeTransaction } = useTransaction();

	// add isLoading to form
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
	const onFormDetailsSubmit = ({
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
	const handleTransactionStart = (onLoadingHeader?: string) => {
		setIsTransactionLoading(true);
		setLoadingStatusText('Waiting approval from your wallet...');
		onLoadingHeader && setFormHeader(onLoadingHeader);
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

	const getAction = (confirmActionType: ConfirmActionType) => {
		if (confirmActionType === ConfirmActionType.UNLOCK) {
			return sdk.lockDomainMetadata;
		} else if (confirmActionType === ConfirmActionType.SAVE_AND_LOCK) {
			return sdk.setAndLockDomainMetadata;
		} else {
			return sdk.setDomainMetadata;
		}
	};

	// Executes the transaction.
	const onSubmitTransaction = () => {
		setErrorText(undefined);

		const loadingTextContent = getLoadingText(
			isMetadataLocked,
			confirmActionType,
		);

		const sdkAction = getAction(confirmActionType);

		return executeTransaction(
			sdkAction,
			[
				domainId,
				confirmActionType === ConfirmActionType.UNLOCK
					? !isMetadataLocked
					: details,
				provider.getSigner(),
			],
			{
				onStart: () =>
					handleTransactionStart(loadingTextContent?.onLoadingHeader),
				onProcessing: () =>
					handleTransactionProcessing(loadingTextContent.onLoadingText),
				onSuccess: () => handleTransactionSuccess(),

				onError: (error: any) => handleTransactionError(error.message),
				invalidationKeys: [
					['user', { account, domainId, details, isMetadataLocked }],
				],
			},
		);
	};

	// Form content structure
	let formContent: ReactNode;

	switch (stepId) {
		case FormStep.DETAILS:
			formContent = (
				<DetailsStep
					zna={zna}
					stepId={stepId}
					errorText={errorText}
					onStepUpdate={(step: Step) => setStepId(step.id)}
					onTitleUpdate={(title: string) => setFormHeader(title)}
					onFormDetailsSubmit={onFormDetailsSubmit}
					onConfirmActionUpdate={(action: ConfirmActionType) =>
						setConfirmActionType(action)
					}
				/>
			);
			break;

		case FormStep.CONFIRM:
			formContent = !isTransactionLoading ? (
				<ConfirmStep
					confirmActionType={confirmActionType}
					onStepUpdate={(step: Step) => setStepId(step.id)}
					onSubmit={onSubmitTransaction}
				/>
			) : (
				<Wizard.Loading message={loadingStatusText} />
			);
			break;

		case FormStep.COMPLETE:
			formContent = !isTransactionLoading ? (
				<DetailsStep
					zna={zna}
					stepId={stepId}
					errorText={errorText}
					confirmActionType={confirmActionType}
					onLockMetadataStatus={onSubmitTransaction}
					onStepUpdate={(step: Step) => setStepId(step.id)}
					onConfirmActionUpdate={(action: ConfirmActionType) =>
						setConfirmActionType(action)
					}
					onClose={onClose}
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
		onStepUpdate: (step: Step) => setStepId(step.id),
	};
};

/************************
 * getTransactionType
 ************************/

const getLoadingText = (
	isMetadataLocked: boolean,
	confirmActionType: ConfirmActionType,
) => {
	let loadingTextContent: { onLoadingHeader?: string; onLoadingText: string };

	const transactionTimingPrompt =
		'\nThis may take up to 20 mins. Do not close this window or refresh your browser...';

	const savingLoadingTextVariant =
		confirmActionType === ConfirmActionType.SAVE_AND_LOCK
			? 'Saving & locking metadata...'
			: 'Saving metadata changes...';

	switch (confirmActionType) {
		case ConfirmActionType.UNLOCK:
			loadingTextContent = {
				onLoadingText: `${
					isMetadataLocked ? 'Unlocking' : 'Locking'
				} metadata. ${transactionTimingPrompt}`,
			};
			break;

		case ConfirmActionType.SAVE_AND_LOCK:
			loadingTextContent = {
				onLoadingHeader: 'Save & Lock Metadata',
				onLoadingText: `${savingLoadingTextVariant} ${transactionTimingPrompt}`,
			};
			break;

		case ConfirmActionType.SAVE_WITHOUT_LOCKING:
			loadingTextContent = {
				onLoadingHeader: 'Save Metadata Changes',
				onLoadingText: `${savingLoadingTextVariant} ${transactionTimingPrompt}`,
			};
			break;
	}

	return loadingTextContent;
};
