import { FC } from 'react';

import { steps, ConfirmActionType } from '../../DomainSettings.types';

import { FormErrorText } from '../../../ui';
import { Button, Step } from '@zero-tech/zui/components';
import { InfoTooltip } from '@zero-tech/zui/components/InfoTooltip';
import { IconLock1, IconLockUnlocked1 } from '@zero-tech/zui/components/Icons';

import styles from './Footer.module.scss';

interface CompleteStepFooterProps {
	errorText: string;
	confirmActionType: ConfirmActionType;
	onConfirmActionUpdate: (action: ConfirmActionType) => void;
	onStepUpdate: (step: Step) => void;
	onLockMetadataStatus: () => void;
	onClose: () => void;
}

export const CompleteStepFooter: FC<CompleteStepFooterProps> = ({
	errorText,
	confirmActionType,
	onConfirmActionUpdate,
	onStepUpdate,
	onLockMetadataStatus,
	onClose,
}) => {
	const onEdit = () => onStepUpdate(steps[0]);

	return (
		<>
			{errorText && (
				<FormErrorText className={styles.ErrorText} text={errorText} />
			)}

			{!errorText && <SuccessLabel confirmActionType={confirmActionType} />}

			<div className={styles.Buttons}>
				<>
					<Icons confirmActionType={confirmActionType} />

					<ButtonGroup
						errorText={errorText}
						confirmActionType={confirmActionType}
						onEdit={onEdit}
						onClose={onClose}
						onLockMetadataStatus={onLockMetadataStatus}
						onConfirmActionUpdate={onConfirmActionUpdate}
					/>

					<InfoTooltip
						content={
							confirmActionType === ConfirmActionType.SAVE_AND_LOCK &&
							!Boolean(errorText)
								? 'Metadata is locked. Only the person who locked it may unlock and make changes.'
								: 'Metadata is unlocked, if you transfer ownership of this domain, the new owner can edit metadata and lock it. You may lose access forever. You can lock the metadata preventing future edits by anyone other than you.'
						}
					/>
				</>
			</div>
		</>
	);
};

/****************
 * SuccessLabel
 ****************/

interface SuccessLabelProps {
	confirmActionType: string;
}

const SuccessLabel = ({ confirmActionType }: SuccessLabelProps) => {
	return (
		<label className={styles.Label} data-variant={'success'}>
			{confirmActionType === ConfirmActionType.SAVE_AND_LOCK
				? 'Your changes have been saved and the metadata is locked'
				: confirmActionType === ConfirmActionType.UNLOCK
				? 'Success. Metadata is unlocked'
				: 'Your changes have been saved'}
		</label>
	);
};

/****************
 * Icons
 ****************/

interface IconsProps {
	confirmActionType: string;
}

const Icons = ({ confirmActionType }: IconsProps) => {
	return (
		<>
			{confirmActionType === ConfirmActionType.SAVE_AND_LOCK ? (
				<IconLock1 className={styles.LockedIcon} />
			) : (
				<IconLockUnlocked1 className={styles.UnlockedIcon} />
			)}
		</>
	);
};

/****************
 * SuccessLabel
 ****************/

interface ButtonGroupProps {
	errorText: string;
	confirmActionType: string;
	onEdit: () => void;
	onClose: () => void;
	onLockMetadataStatus: () => void;
	onConfirmActionUpdate: (action: ConfirmActionType) => void;
}

const ButtonGroup = ({
	errorText,
	confirmActionType,
	onEdit,
	onClose,
	onLockMetadataStatus,
	onConfirmActionUpdate,
}: ButtonGroupProps) => {
	return (
		<>
			{(confirmActionType === ConfirmActionType.SAVE_WITHOUT_LOCKING ||
				Boolean(errorText)) && (
				<Button
					onPress={() => {
						onLockMetadataStatus();
						onConfirmActionUpdate(ConfirmActionType.SAVE_AND_LOCK);
					}}
				>
					{'Lock Metadata'}
				</Button>
			)}

			{confirmActionType === ConfirmActionType.UNLOCK && (
				<Button onPress={onEdit}>{'Edit Metadata'}</Button>
			)}

			<Button onPress={onClose}>{'Finish'}</Button>
		</>
	);
};
