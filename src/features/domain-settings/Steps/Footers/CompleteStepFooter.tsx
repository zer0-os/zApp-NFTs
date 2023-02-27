import { FC } from 'react';

import { ConfirmActionType } from '../../DomainSettings.types';
import { COMPLETE_STEP_LABEL_TEXT } from '../../DomainSettings.constants';

import { FormErrorText } from '../../../ui';
import { Button } from '@zero-tech/zui/components';
import { InfoTooltip } from '@zero-tech/zui/components/InfoTooltip';
import { IconLock1, IconLockUnlocked1 } from '@zero-tech/zui/components/Icons';

import styles from './Footer.module.scss';

interface CompleteStepFooterProps {
	errorText: string;
	isMetadataLocked: boolean;
	confirmActionType: ConfirmActionType;
	onRestart: () => void;
	onSubmit: (action: ConfirmActionType) => void;
	onClose: () => void;
}

export const CompleteStepFooter: FC<CompleteStepFooterProps> = ({
	errorText,
	isMetadataLocked,
	confirmActionType,
	onSubmit,
	onRestart,
	onClose,
}) => {
	const tooltipConetnt = isMetadataLocked
		? 'Metadata is locked. Only the person who locked it may unlock and make changes.'
		: 'Metadata is unlocked, if you transfer ownership of this domain, the new owner can edit metadata and lock it. You may lose access forever. You can lock the metadata preventing future edits by anyone other than you.';

	return (
		<>
			{errorText && (
				<FormErrorText className={styles.ErrorText} text={errorText} />
			)}

			{!errorText && <SuccessLabel confirmActionType={confirmActionType} />}

			<div className={styles.Buttons}>
				<>
					<Icons isMetadataLocked={isMetadataLocked} />

					<ButtonGroup
						errorText={errorText}
						confirmActionType={confirmActionType}
						onRestart={onRestart}
						onSubmit={(action: ConfirmActionType) => onSubmit(action)}
						onClose={onClose}
					/>

					<InfoTooltip content={tooltipConetnt} />
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
	const { label } = COMPLETE_STEP_LABEL_TEXT[confirmActionType];

	return (
		<label className={styles.Label} data-variant={'success'}>
			{label}
		</label>
	);
};

/****************
 * Icons
 ****************/

interface IconsProps {
	isMetadataLocked: boolean;
}

const Icons = ({ isMetadataLocked }: IconsProps) => {
	return (
		<>
			{isMetadataLocked ? (
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
	onRestart: () => void;
	onClose: () => void;
	onSubmit: (action: ConfirmActionType) => void;
}

const ButtonGroup = ({
	errorText,
	confirmActionType,
	onRestart,
	onClose,
	onSubmit,
}: ButtonGroupProps) => {
	return (
		<>
			{(confirmActionType === ConfirmActionType.SAVE_WITHOUT_LOCKING ||
				Boolean(errorText)) && (
				<Button onPress={() => onSubmit(ConfirmActionType.LOCK)}>
					{'Lock Metadata'}
				</Button>
			)}

			{confirmActionType === ConfirmActionType.UNLOCK &&
				!Boolean(errorText) && (
					<Button onPress={onRestart}>{'Edit Metadata'}</Button>
				)}

			<Button onPress={onClose}>{'Finish'}</Button>
		</>
	);
};
