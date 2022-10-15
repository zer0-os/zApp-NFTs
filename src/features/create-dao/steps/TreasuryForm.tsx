import { FC, useContext } from 'react';

import { Form, Formik } from 'formik';

import { Wizard } from '@zero-tech/zui/components';
import { CreateDAOFormContext } from '../';

import styles from './TreasuryForm.module.scss';

interface TreasuryFormProps {
	onClose: () => void;
}

export const TreasuryForm: FC<TreasuryFormProps> = ({ onClose }) => {
	const { treasury, onTreasurySubmit } = useContext(CreateDAOFormContext);

	return (
		<Formik initialValues={treasury} onSubmit={onTreasurySubmit}>
			{({ submitForm }) => (
				<Form>
					<p>Enter treasury content here...</p>
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
