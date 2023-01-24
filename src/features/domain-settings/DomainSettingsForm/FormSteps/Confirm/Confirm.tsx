import { FC } from 'react';

import { useDomainSettingsData } from '../../../..//domain-settings/useDomainSettingsData';

import { Wizard } from '@zero-tech/zui/components/Wizard';

import styles from './Confirm.module.scss';

export interface ConfirmProps {
	zna: string;
	onBack: () => void;
	onConfirm: () => void;
}

export const Confirm: FC<ConfirmProps> = ({ zna, onBack, onConfirm }) => {
	const { localState } = useDomainSettingsData(zna);

	return (
		<Wizard.Confirmation
			className={styles.Confirmation}
			isPrimaryButtonActive
			isSecondaryButtonActive
			onClickPrimaryButton={onConfirm}
			onClickSecondaryButton={onBack}
			primaryButtonText={
				localState.isMetadataLocked ? 'Unlock Metadata' : 'Save & Lock'
			}
			secondaryButtonText={'Return'}
			message={
				localState.isMetadataLocked
					? 'Unlocking metadata is a blockchain transaction that will cost gas. \nAdditional, optional, transactions are required to save changes and lock the metadata again.'
					: 'Your changes will be saved and the metadata will be locked. \nYou will be the only one who can unlock it in the future.'
			}
		/>
	);
};
