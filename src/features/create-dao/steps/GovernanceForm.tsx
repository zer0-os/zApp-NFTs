import { FC, useContext } from 'react';

import { Form, Formik } from 'formik';

import { Wizard } from '@zero-tech/zui/components';
import { CreateDAOFormContext } from '../';

import styles from './GovernanceForm.module.scss';

interface GovernanceFormProps {
	onClose: () => void;
}

export const GovernanceForm: FC<GovernanceFormProps> = ({ onClose }) => {
	const { governance, onGovernanceSubmit } = useContext(CreateDAOFormContext);

	return (
		<Formik initialValues={governance} onSubmit={onGovernanceSubmit}>
			{({ submitForm }) => (
				<Form>
					<p>Enter governance content here...</p>
					<Wizard.Buttons
						className={styles.Footer}
						isPrimaryButtonActive
						isSecondaryButtonActive
						primaryButtonText="Next"
						onClickPrimaryButton={submitForm}
						onClickSecondaryButton={onClose}
					/>
				</Form>
			)}
		</Formik>
	);
};
