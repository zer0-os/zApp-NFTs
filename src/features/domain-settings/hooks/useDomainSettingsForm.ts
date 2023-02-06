import { useCallback, useState } from 'react';

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

import { Step } from '@zero-tech/zui/components';

export type UseDomainSettingsFormFormReturn = {
	stepId: string;
	formHeader: string;
	errorText: string;
	confirmActionType: ConfirmActionType;
	loadingStatusText: string;
	isTransactionLoading: boolean;
	onStepUpdate: (step: Step) => void;
	onTitleUpdate: (title: string) => void;
	onFormDetailsSubmit: (values: FieldValues) => void;
	onLockMetadataStatus: () => void;
	onSetAndLockMetadata: () => void;
	onSetMetadata: () => void;
	onConfirmActionUpdate: (action: ConfirmActionType) => void;
};

export const useDomainSettingsForm = (
	zna: string,
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

	const [isMetadataLocked, setIsMetadataLocked] =
		useState<boolean>(metadataLockedStatus);

	// Form field data
	const [details, setDetails] = useState<DetailsFormSubmit>();
	console.log(details);
	console.log(metadata);

	console.log('BODY', isMetadataLocked);

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
			title,
			description,
			attributes: metadata?.attributes,
			image: metadata?.image,
			image_full: metadata?.image_full,
			previewImage: metadata?.previewImage,
			animation_url: metadata?.animation_url,
			stakingRequests: metadata?.stakingRequests,
			isMintable,
			isBiddable,
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

		setIsMetadataLocked(isDomainMetadataLocked);

		return isDomainMetadataLocked;
	}, [domainId, provider, setIsMetadataLocked]);

	// const onGetDomainMetadata = useCallback(async () => {
	// 	const domainMetadata = await sdk.getDomainMetadata(
	// 		domainId,
	// 		provider.getSigner(),
	// 	);

	// 	// setIsMetadataLocked(isDomainMetadataLocked);
	// 	console.log('here');

	// 	console.log('DOMINA', domainMetadata);

	// 	return domainMetadata;
	// }, [domainId, provider, setIsMetadataLocked]);

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

	return {
		stepId,
		formHeader,
		errorText,
		confirmActionType,
		loadingStatusText,
		isTransactionLoading,
		onStepUpdate,
		onTitleUpdate,
		onFormDetailsSubmit,
		onLockMetadataStatus,
		onSetAndLockMetadata,
		onSetMetadata,
		onConfirmActionUpdate,
	};
};
