import { FC } from 'react';

import { Wizard } from '@zero-tech/zui/components/Wizard';

import styles from '../FormSteps.module.scss';

export interface ConfirmProps {
	zna: string;
	errorText: string;
	onBack: () => void;
	onConfirm: () => void;
}

export const Confirm: FC<ConfirmProps> = ({
	zna,
	errorText,
	onBack,
	onConfirm,
}) => {
	return (
		<>
			<div className={styles.Container}>
				<Wizard.Confirmation
					className={styles.Confirmation}
					isPrimaryButtonActive
					isSecondaryButtonActive
					primaryButtonText={'Save & Lock'}
					secondaryButtonText={'Return'}
					onClickPrimaryButton={onConfirm}
					onClickSecondaryButton={onBack}
					message={
						'Your changes will be saved and the metadata will be locked. \nYou will be the only one who can unlock it in the future.'
					}
				/>
			</div>
		</>
	);
};
