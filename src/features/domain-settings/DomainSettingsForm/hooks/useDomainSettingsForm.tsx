import { ReactNode, useState, useEffect } from 'react';

import { Step } from '../FormSteps/hooks';
import { useWeb3, useZnsSdk } from '../../../../lib/hooks';
import { useDomainSettingsData } from '../../useDomainSettingsData';
import { truncateAddress } from '@zero-tech/zui/utils';
import { useTransaction } from '@zero-tech/zapp-utils/hooks/useTransaction';

export type StatusType = 'success' | 'error' | 'warning';
export type StatusTextType = { variant: StatusType; text: ReactNode };

export type ButtonType = {
	primaryText: string;
	secondaryText?: string;
	action: () => void;
};

export type UseDomainSettingsFormReturn = {
	step: Step;
	buttonGroup: ButtonType;
	footerStatusText: StatusTextType;
	loadingStatusText: string;
	onBack: () => void;
	onChangeStep: () => void;
	onLockMetadataStatus: () => void;
};

/**
 * Drives the logic behind the domain settings form.
 */
export const useDomainSettingsForm = (
	zna: string,
	onClose: () => void,
): UseDomainSettingsFormReturn => {
	const sdk = useZnsSdk();

	const { account, provider } = useWeb3();
	const { executeTransaction } = useTransaction();
	const { domainId, localState, isLockedByOwner, domainLockedBy } =
		useDomainSettingsData(zna);

	const [step, setStep] = useState<Step>(Step.DETAILS);
	const [loadingStatusText, setLoadingStatusText] = useState<string>();
	const [footerStatusText, setFooterStatusText] = useState<StatusTextType>();

	// think of better naming here
	const [buttonGroup, setButtonGroup] = useState<ButtonType>();

	const onChangeStep = () => {
		setStep(Step.CONFIRM);
	};

	const onBack = () => {
		setStep(Step.DETAILS);
	};

	const onCheckInitialFooterStatusText = () => {
		setFooterStatusText(undefined);

		if (isLockedByOwner) {
			setFooterStatusText({
				variant: 'warning',
				text: 'Please unlock to make changes',
			});
		} else {
			setFooterStatusText({
				variant: 'warning',
				text: `You cannot unlock the metadata to make changes \nIt was locked by ${truncateAddress(
					domainLockedBy,
				)}`,
			});
		}
	};

	const onCheckInitialButtonGroup = () => {
		setButtonGroup(undefined);

		if (localState.isMetadataLocked) {
			setButtonGroup({ primaryText: 'Unlock Metadata', action: onChangeStep });
		} else {
			setButtonGroup({
				primaryText: 'Save Changes',
				secondaryText: 'Save and Lock',
				action: onChangeStep,
			});
		}
	};

	// add handlers e.g. handleSuccess, handleProcessing etc
	// add primary button action and secondary button action
	// improve/tidy the below conditions

	const onLockMetadataStatus = () => {
		setFooterStatusText(undefined);

		const lockStatus = localState.isMetadataLocked;

		return executeTransaction(
			sdk.lockDomainMetadata,
			[domainId, !lockStatus, provider.getSigner()],
			{
				onStart: () => {
					setStep(Step.LOADING);
					setLoadingStatusText('Waiting approval from your wallet...');
				},
				onProcessing: () =>
					setLoadingStatusText(
						lockStatus
							? 'Unlocking metadata... This may take up to 20 mins. Do not close this window or refresh your browser...'
							: 'Saving & locking metadata... \nThis may take up to 20 mins. Do not close this window or refresh your browser...',
					),
				onSuccess: () => {
					setStep(lockStatus ? Step.DETAILS : Step.COMPLETE);
					setFooterStatusText({
						variant: 'success',
						text: lockStatus
							? 'Metadata unlocked, you may now make changes'
							: 'Your changes have been saved and the metadata is locked',
					});

					// improve this
					setButtonGroup({
						primaryText: lockStatus ? 'Save Changes' : 'Finish',
						secondaryText: lockStatus ? 'Save and Lock' : undefined,
						action: lockStatus ? onChangeStep : onClose,
					});
				},
				onError: (error: any) => {
					setFooterStatusText({ variant: 'error', text: error.message });
					setStep(Step.DETAILS);
				},

				invalidationKeys: [['user', { account, domainId, lockStatus }]],
			},
		);
	};

	useEffect(() => {
		onCheckInitialButtonGroup();

		if (localState.isMetadataLocked) {
			onCheckInitialFooterStatusText();
		}
	}, [localState.isMetadataLocked]);

	return {
		step,
		buttonGroup,
		footerStatusText,
		loadingStatusText,
		onBack,
		onChangeStep,
		onLockMetadataStatus,
	};
};
