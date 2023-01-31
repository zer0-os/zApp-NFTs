import React, { createContext, useState, FC, ReactNode } from 'react';

import {
	useWeb3,
	useZnsSdk,
	useDomainData,
	useDomainMetadata,
} from '../../lib/hooks';
import { getDomainId } from '../../lib/util';
import { truncateAddress } from '@zero-tech/zui/utils';
import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';

import { DetailsFormSubmit, steps } from '.';
import { Step } from '@zero-tech/zui/components';

export const DomainSettingsFormContext = createContext({
	domainId: '',
	stepId: 'details',
	header: 'Domain Settings',
	details: {
		// zna: '',
		title: '',
		description: '',
		attributes: undefined,
		image: '',
		image_full: '',
		previewImage: '',
		animation_url: '',
		stakingRequests: undefined,
		isMintable: undefined,
		isBiddable: undefined,
		gridViewByDefault: undefined,
		customDomainHeader: undefined,
		customDomainHeaderValue: undefined,
	},
	imageAlt: '',
	imageSrc: '',
	errorText: '',
	confirmActionType: undefined,
	isMetadataLocked: undefined,
	isLockedByOwner: undefined,
	truncatedLockedByAddress: '',
	loadingStatusText: '',
	isLoading: undefined,
	onBack: (step: Step) => {},
	onStepUpdate: (step: Step) => {},
	onTitleUpdate: (title: string) => {},
	onDetailsChange: (values: DetailsFormSubmit) => {},
	onDetailsSubmit: (values: DetailsFormSubmit) => {},
	onLockMetadataStatus: async () => {},
	onSetAndLockMetadata: async () => {},
	onSetMetadata: async () => {},
	onConfirmActionUpdate: (action: ConfirmActionType) => {},
});

export enum ConfirmActionType {
	SAVE_AND_LOCK = 'save-and-lock',
	UNLOCK = 'unlock',
	SAVE_WITHOUT_LOCKING = 'save-without-locking',
}

interface Props {
	zna: string;
	children: React.ReactNode;
}

export const DomainSettingsFormContextProvider: FC<Props> = ({
	zna,
	children,
}) => {
	const sdk = useZnsSdk();
	const domainId = getDomainId(zna);

	const { account, provider } = useWeb3();
	const { executeTransaction } = useTransaction();
	const { data: domain } = useDomainData(domainId);
	const { data: metadata } = useDomainMetadata(domainId);

	const [confirmActionType, setConfirmActionType] =
		useState<ConfirmActionType>();
	const [stepId, setStepId] = useState(steps[0].id);
	const [errorText, setErrorText] = useState<string>();
	const [header, setHeader] = useState<string>('My Domain Settings');
	const [isLoading, setIsLoading] = useState<boolean>();
	const [loadingStatusText, setLoadingStatusText] = useState<string>();

	const [details, setDetails] = useState<DetailsFormSubmit>({
		// zna,
		title: metadata?.title,
		description: metadata?.description,
		attributes: metadata?.attributes,
		image: metadata?.image,
		image_full: metadata?.image_full,
		previewImage: metadata?.previewImage,
		animation_url: metadata?.animation_url,
		stakingRequests: metadata?.stakingRequests,
		isMintable: Boolean(metadata?.isMintable),
		isBiddable: Boolean(metadata?.isBiddable),
		gridViewByDefault: Boolean(metadata?.gridViewByDefault),
		customDomainHeader: Boolean(metadata?.customDomainHeader),
		customDomainHeaderValue: metadata?.customDomainHeaderValue,
	});

	const imageAlt = `${metadata?.title ?? 'loading'} nft image`;
	const imageSrc =
		metadata?.animation_url || metadata?.image_full || metadata?.image || '';

	const isMetadataLocked = domain?.isLocked;
	const truncatedLockedByAddress = truncateAddress(domain?.lockedBy) ?? '';
	const isLockedByOwner =
		domain?.isLocked &&
		domain?.lockedBy.toLowerCase() === account?.toLowerCase();

	const onBack = (): void => {
		setStepId(steps[0].id);
		setErrorText(undefined);
	};

	const onStepUpdate = (step: Step): void => {
		setStepId(step.id);
	};

	const onConfirmActionUpdate = (action: ConfirmActionType): void => {
		setConfirmActionType(action);
	};

	const onTitleUpdate = (title: string): void => {
		setHeader(title);
	};

	const onDetailsChange = (values: DetailsFormSubmit): void => {
		setDetails(values);
	};

	const onDetailsSubmit = (values: DetailsFormSubmit): void => {
		console.log('here');
		onStepUpdate(steps[1]);
		setDetails(values);
	};

	const handleTransactionStart = (onLoadingHeader?: string) => {
		setIsLoading(true);
		setLoadingStatusText('Waiting approval from your wallet...');
		onLoadingHeader && setHeader(onLoadingHeader);
	};

	const handleTransactionProcessing = (onLoadingText: string) => {
		setLoadingStatusText(onLoadingText);
	};

	const handleTransactionSuccess = () => {
		setIsLoading(false);
		onStepUpdate(steps[2]);
	};

	const handleTransactionError = (errorMessage: string) => {
		setIsLoading(false);
		setErrorText(errorMessage);
		onStepUpdate(steps[0]);
	};

	const onLockMetadataStatus = () => {
		setErrorText(undefined);

		const lockStatus = isMetadataLocked;
		const onLoadingText =
			'Unlocking metadata... This may take up to 20 mins. Do not close this window or refresh your browser...';

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

	// const onGetDomainMetadata = () => {
	// 	return executeTransaction(
	// 		sdk.getDomainMetadata,
	// 		[domainId, provider.getSigner()],
	// 		{
	// 			onStart: () => {},
	// 			onProcessing: () => {},
	// 			onSuccess: () => {},
	// 			onError: (error: any) => {
	// 				setErrorText(error.message);
	// 			},

	// 			invalidationKeys: [['user', { account, domainId }]],
	// 		},
	// 	);
	// };

	return (
		<DomainSettingsFormContext.Provider
			value={{
				domainId,
				stepId,
				header,
				details,
				imageAlt,
				imageSrc,
				errorText,
				confirmActionType,
				isMetadataLocked,
				truncatedLockedByAddress,
				isLockedByOwner,
				loadingStatusText,
				isLoading,
				onBack,
				onStepUpdate,
				onTitleUpdate,
				onDetailsChange,
				onDetailsSubmit,
				onLockMetadataStatus,
				onSetAndLockMetadata,
				onSetMetadata,
				onConfirmActionUpdate,
			}}
		>
			{children}
		</DomainSettingsFormContext.Provider>
	);
};
