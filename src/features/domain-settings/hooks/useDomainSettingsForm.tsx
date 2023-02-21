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

import { ConfirmForm, DetailsForm } from '../Steps';
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
	const { domainId, metadata, metadataLockedStatus } =
		useDomainSettingsData(zna);

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

	const onStepUpdate = (step: Step) => {
		setStepId(step.id);
	};

	const onConfirmActionUpdate = (action: ConfirmActionType): void => {
		setConfirmActionType(action);
	};

	const onTitleUpdate = (title: string): void => {
		setFormHeader(title);
	};

	const onCheckMetadataLockStatus = useCallback(async () => {
		const isDomainMetadataLocked = await sdk.isDomainMetadataLocked(
			domainId,
			provider.getSigner(),
		);

		return isDomainMetadataLocked;
	}, [domainId, provider]);

	const onGetDomainMetadata = useCallback(async () => {
		const domainMetadata = await sdk.getDomainMetadata(
			domainId,
			provider.getSigner(),
		);

		console.log('here');

		console.log('DOMINA', domainMetadata);

		return domainMetadata;
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
		onStepUpdate(steps[2]);
		onCheckMetadataLockStatus();
		onGetDomainMetadata();
	};

	const handleTransactionError = (errorMessage: string) => {
		setIsTransactionLoading(false);
		setErrorText(errorMessage);
		onStepUpdate(stepId === FormStep.COMPLETE ? steps[2] : steps[0]);
	};

	// Transactions
	const onLockMetadataStatus = () => {
		setErrorText(undefined);

		const lockStatus = metadataLockedStatus;
		const onLoadingText = `${
			lockStatus ? 'Unlocking' : 'Locking'
		} metadata... This may take up to 20 mins. Do not close this window or refresh your browser...`;

		return executeTransaction(
			sdk.lockDomainMetadata,
			[domainId, !lockStatus, provider.getSigner()],
			{
				onStart: () => handleTransactionStart(),
				onProcessing: () => handleTransactionProcessing(onLoadingText),
				onSuccess: () => handleTransactionSuccess(),
				onError: (error: any) => handleTransactionError(error.message),
				invalidationKeys: [['user', { account, domainId, lockStatus }]],
			},
		);
	};

	const onSetAndLockMetadata = () => {
		setErrorText(undefined);

		const onLoadingHeader = 'Save & Lock Metadata';
		const onLoadingText =
			'Saving & locking metadata... \nThis may take up to 20 mins. Do not close this window or refresh your browser...';

		return executeTransaction(
			sdk.setAndLockDomainMetadata,
			[domainId, details, provider.getSigner()],
			{
				onStart: () => handleTransactionStart(onLoadingHeader),
				onProcessing: () => handleTransactionProcessing(onLoadingText),
				onSuccess: () => handleTransactionSuccess(),

				onError: (error: any) => handleTransactionError(error.message),
				invalidationKeys: [['user', { account, domainId, details }]],
			},
		);
	};

	const onSetMetadata = () => {
		setErrorText(undefined);

		const onLoadingHeader = 'Save Metadata Changes';
		const onLoadingText =
			'Saving metadata changes... This may take up to 20 mins. \nDo not close this window or refresh your browser...';

		return executeTransaction(
			sdk.setDomainMetadata,
			[domainId, details, provider.getSigner()],
			{
				onStart: () => handleTransactionStart(onLoadingHeader),
				onProcessing: () => handleTransactionProcessing(onLoadingText),
				onSuccess: () => handleTransactionSuccess(),
				onError: (error: any) => handleTransactionError(error.message),
				invalidationKeys: [['user', { account, domainId, details }]],
			},
		);
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
					onStepUpdate={onStepUpdate}
					onTitleUpdate={onTitleUpdate}
					onFormDetailsSubmit={onFormDetailsSubmit}
					onConfirmActionUpdate={onConfirmActionUpdate}
				/>
			);
			break;

		case FormStep.CONFIRM:
			formContent = !isTransactionLoading ? (
				<ConfirmForm
					confirmActionType={confirmActionType}
					onStepUpdate={onStepUpdate}
					onLockMetadataStatus={onLockMetadataStatus}
					onSetAndLockMetadata={onSetAndLockMetadata}
					onSetMetadata={onSetMetadata}
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
					errorText={errorText}
					confirmActionType={confirmActionType}
					onLockMetadataStatus={onLockMetadataStatus}
					onStepUpdate={onStepUpdate}
					onConfirmActionUpdate={onConfirmActionUpdate}
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
		onStepUpdate,
	};
};
