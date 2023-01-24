import { FC } from 'react';

import { ButtonType } from '../../../hooks';
import { useDomainSettingsData } from '../../../../useDomainSettingsData';

import { Button } from '@zero-tech/zui/components';
import { InfoTooltip } from '@zero-tech/zui/components/InfoTooltip';
import { IconLock1, IconLockUnlocked1 } from '@zero-tech/zui/components/Icons';

import styles from './ButtonGroup.module.scss';

export interface ButtonGroupProps {
	zna: string;
	buttonGroup: ButtonType;
}

export const ButtonGroup: FC<ButtonGroupProps> = ({ zna, buttonGroup }) => {
	const { localState } = useDomainSettingsData(zna);

	return (
		<div className={styles.Buttons}>
			{!localState.isMetadataLocked ? (
				<IconLockUnlocked1 className={styles.UnlockedIcon} />
			) : (
				<IconLock1 className={styles.LockedIcon} />
			)}

			<Button onPress={buttonGroup?.action}>{buttonGroup?.primaryText}</Button>

			{buttonGroup?.secondaryText && (
				<Button onPress={buttonGroup?.action}>
					{buttonGroup?.secondaryText}
				</Button>
			)}

			<InfoTooltip
				content={
					localState.isMetadataLocked
						? 'Metadata is locked. Only the person who locked it may unlock and make changes.'
						: 'You may save changes leaving the metadata unlocked for the next owner to edit, or save & lock the metadata preventing future edits by anyone other than you.'
				}
			/>
		</div>
	);
};
