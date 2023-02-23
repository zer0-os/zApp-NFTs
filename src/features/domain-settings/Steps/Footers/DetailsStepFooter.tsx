import { FC } from 'react';

import { ConfirmActionType, steps } from '../..';
import { useDomainSettingsData } from '../../hooks';

import { FormErrorText } from '../../../ui';
import { Button, Step } from '@zero-tech/zui/components';
import { InfoTooltip } from '@zero-tech/zui/components/InfoTooltip';
import { IconLock1, IconLockUnlocked1 } from '@zero-tech/zui/components/Icons';

import styles from './Footer.module.scss';

interface DetailsStepFooterProps {
	zna: string;
	errorText: string;
	onSubmit: (action: ConfirmActionType, step: Step, formHeader: string) => void;
}

export const DetailsStepFooter: FC<DetailsStepFooterProps> = ({
	zna,
	errorText,
	onSubmit,
}) => {
	const { truncatedLockedByAddress, isLockedByOwner, metadataLockedStatus } =
		useDomainSettingsData(zna);

	const tooltipContent = metadataLockedStatus
		? 'Metadata is locked. Only the person who locked it may unlock and make changes.'
		: 'You may save changes leaving the metadata unlocked for the next owner to edit, or save & lock the metadata preventing future edits by anyone other than you.';

	return (
		<>
			{errorText && (
				<FormErrorText className={styles.ErrorText} text={errorText} />
			)}

			{!errorText && metadataLockedStatus && (
				<WarningLabel
					isLockedByOwner={isLockedByOwner}
					truncatedLockedByAddress={truncatedLockedByAddress}
				/>
			)}

			<div className={styles.Buttons}>
				{metadataLockedStatus && isLockedByOwner && (
					<>
						<IconLock1 className={styles.LockedIcon} />
						<Button
							onPress={() =>
								onSubmit(ConfirmActionType.UNLOCK, steps[1], 'Unlock Metadata?')
							}
						>
							Unlock Metadata
						</Button>
					</>
				)}
				{metadataLockedStatus && !isLockedByOwner && (
					<>
						<IconLock1 className={styles.LockedIcon} />
						<Button isDisabled>Metadata Locked</Button>
					</>
				)}
				{!metadataLockedStatus && (
					<>
						<IconLockUnlocked1 className={styles.UnlockedIcon} />
						<Button
							onPress={() =>
								onSubmit(
									ConfirmActionType.SAVE_WITHOUT_LOCKING,
									steps[1],
									'Save Without Locking',
								)
							}
						>
							Save Changes
						</Button>
						<Button
							onPress={() =>
								onSubmit(
									ConfirmActionType.SAVE_AND_LOCK,
									steps[1],
									'Save & Lock?',
								)
							}
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
