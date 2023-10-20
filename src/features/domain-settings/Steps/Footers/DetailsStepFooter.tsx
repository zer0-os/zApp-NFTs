import { FC } from 'react';

import { ConfirmActionType } from '../..';
import { useDomainSettingsData } from '../../hooks';

import { FormErrorText } from '../../../ui';
import { Button } from '@zero-tech/zui/components';
import { InfoTooltip } from '@zero-tech/zui/components/InfoTooltip';
import { IconLock1, IconLockUnlocked1 } from '@zero-tech/zui/components/icons';

import styles from './Footer.module.scss';

interface DetailsStepFooterProps {
	zna: string;
	errorText: string;
	onSubmit: (action: ConfirmActionType) => void;
}

export const DetailsStepFooter: FC<DetailsStepFooterProps> = ({
	zna,
	errorText,
	onSubmit,
}) => {
	const { truncatedLockedByAddress, isLockedByOwner, isMetadataLocked } =
		useDomainSettingsData(zna);

	const onSubmitDetails = (action: ConfirmActionType) => {
		return onSubmit(action);
	};

	const tooltipContent = isMetadataLocked
		? 'Metadata is locked. Only the person who locked it may unlock and make changes.'
		: 'You may save changes leaving the metadata unlocked for the next owner to edit, or save & lock the metadata preventing future edits by anyone other than you.';

	return (
		<>
			{errorText && (
				<FormErrorText className={styles.ErrorText} text={errorText} />
			)}

			{!errorText && isMetadataLocked && (
				<WarningLabel
					isLockedByOwner={isLockedByOwner}
					truncatedLockedByAddress={truncatedLockedByAddress}
				/>
			)}

			<div className={styles.Buttons}>
				{isMetadataLocked && isLockedByOwner && (
					<>
						<IconLock1 className={styles.LockedIcon} />
						<Button onPress={() => onSubmitDetails(ConfirmActionType.UNLOCK)}>
							Unlock Metadata
						</Button>
					</>
				)}
				{isMetadataLocked && !isLockedByOwner && (
					<>
						<IconLock1 className={styles.LockedIcon} />
						<Button isDisabled>Metadata Locked</Button>
					</>
				)}
				{!isMetadataLocked && (
					<>
						<IconLockUnlocked1 className={styles.UnlockedIcon} />
						<Button
							onPress={() =>
								onSubmitDetails(ConfirmActionType.SAVE_WITHOUT_LOCKING)
							}
						>
							Save Changes
						</Button>
						<Button
							onPress={() => onSubmitDetails(ConfirmActionType.SAVE_AND_LOCK)}
						>
							Save and Lock
						</Button>
					</>
				)}
				<InfoTooltip content={tooltipContent} />
			</div>
		</>
	);
};

/****************
 * WarningLabel
 ****************/

interface WarningLabelProps {
	isLockedByOwner: boolean;
	truncatedLockedByAddress: string;
}

const WarningLabel = ({
	isLockedByOwner,
	truncatedLockedByAddress,
}: WarningLabelProps) => {
	return (
		<label className={styles.Label}>
			{isLockedByOwner
				? 'Please unlock to make changes'
				: `You cannot unlock the metadata to make changes. \nIt was locked by ${truncatedLockedByAddress} `}
		</label>
	);
};
