import { FC, useContext } from 'react';

import { Wizard } from '@zero-tech/zui/components';
import { CreateDAOFormContext } from '../';

import styles from './DAOSummary.module.scss';

interface DAOSummaryProps {
	onClose: () => void;
}

export const DAOSummary: FC<DAOSummaryProps> = ({ onClose }) => {
	const { onLaunchSubmit } = useContext(CreateDAOFormContext);

	return (
		<div>
			<p>Enter summary content here...</p>
			<Wizard.Buttons
				className={styles.Footer}
				isPrimaryButtonActive
				isSecondaryButtonActive
				primaryButtonText="Confirm"
				onClickPrimaryButton={onLaunchSubmit}
				onClickSecondaryButton={onClose}
			/>
		</div>
	);
};
