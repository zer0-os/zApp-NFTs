import React, { createContext, useState, FC, ReactNode } from 'react';

import {
	useWeb3,
	useZnsSdk,
	useDomainData,
	useDomainMetadata,
} from '../../lib/hooks';
import { getDomainId } from '../../lib/util';
import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';

import { DetailsFormSubmit, steps } from '.';
import { Step } from '@zero-tech/zui/components';

export type StatusType = 'success' | 'error' | 'warning';
export type StatusTextType = { variant: StatusType; text: ReactNode };

export const DomainSettingsFormContext = createContext({
	stepId: 'details',
	header: 'Domain Settings',
	details: {
		zna: '',
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
		customDomainHeaderValue: '',
	},
	imageAlt: '',
	imageSrc: '',
	errorText: '',
	confirmActionType: undefined,
	isMetadataLocked: undefined,
	isLockedByOwner: undefined,
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
		zna,
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
		customDomainHeaderValue:
			(metadata?.customDomainHeaderValue as string) || '',
	});

	const imageAlt = `${metadata?.title ?? 'loading'} nft image`;
	const imageSrc =
		metadata?.animation_url || metadata?.image_full || metadata?.image || '';

	const isMetadataLocked = domain?.isLocked;
	const isLockedByOwner =
		domain?.isLocked &&
		domain?.lockedBy?.toLowerCase() === account?.toLowerCase();

	const onBack = (): void => {
		setStepId(steps[0].id);
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
		setDetails(values);

		// setStepId(steps[1].id);
	};

	const onLockMetadataStatus = () => {
		setErrorText(undefined);

		const lockStatus = isMetadataLocked;

		return executeTransaction(
			sdk.lockDomainMetadata,
			[domainId, !lockStatus, provider.getSigner()],
			{
				onStart: () => {
					setIsLoading(true);
					setLoadingStatusText('Waiting approval from your wallet...');
				},
				onProcessing: () =>
					setLoadingStatusText(
						'Unlocking metadata... This may take up to 20 mins. Do not close this window or refresh your browser...',
					),
				onSuccess: () => {
					setIsLoading(false);
					onStepUpdate(steps[2]);
					setHeader('My Domain Settings');
				},
				onError: (error: any) => {
					setIsLoading(false);
					setErrorText(error.message);
					onStepUpdate(steps[0]);
				},

				invalidationKeys: [['user', { account, domainId, lockStatus }]],
			},
		);
	};

	const onSetAndLockMetadata = () => {
		setErrorText(undefined);

		return executeTransaction(
			sdk.setAndLockDomainMetadata,
			[domainId, details, provider.getSigner()],
			{
				onStart: () => {
					setIsLoading(true);
					setHeader('Save & Lock Metadata');
					setLoadingStatusText('Waiting approval from your wallet...');
				},
				onProcessing: () =>
					setLoadingStatusText(
						'Saving & locking metadata... \nThis may take up to 20 mins. Do not close this window or refresh your browser...',
					),
				onSuccess: () => {
					setIsLoading(false);
					onStepUpdate(steps[2]);
					setHeader('My Domain Settings');
				},
				onError: (error: any) => {
					setIsLoading(false);
					setErrorText(error.message);
					onStepUpdate(steps[0]);
				},

				invalidationKeys: [['user', { account, domainId, details }]],
			},
		);
	};

	const onSetMetadata = () => {
		setErrorText(undefined);

		return executeTransaction(
			sdk.setDomainMetadata,
			[domainId, details, provider.getSigner()],
			{
				onStart: () => {
					setIsLoading(true);
					setHeader('Save Metadata Changes');
					setLoadingStatusText('Waiting approval from your wallet...');
				},
				onProcessing: () =>
					setLoadingStatusText(
						'Saving metadata changes... This may take up to x mins. \nDo not close this window or refresh your browser...',
					),
				onSuccess: () => {
					setIsLoading(false);
					onStepUpdate(steps[2]);
					setHeader('My Domain Settings');
				},
				onError: (error: any) => {
					setIsLoading(false);
					setErrorText(error.message);
					onStepUpdate(steps[0]);
				},

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

	// 			invalidationKeys: [['user', { account, domainId, details }]],
	// 		},
	// 	);
	// };

	return (
		<DomainSettingsFormContext.Provider
			value={{
				stepId,
				header,
				details,
				imageAlt,
				imageSrc,
				errorText,
				confirmActionType,
				isMetadataLocked,
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
