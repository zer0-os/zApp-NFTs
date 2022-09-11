//- React Imports
import React, { FC } from 'react';
import { Form, Formik } from 'formik';

//- Style Imports
import styles from "./TokenomicsForm.module.scss";

//- Component Imports
import { FormFooter } from '../FormFooter/FormFooter';

//- Type Imports
import { TokenomicsFormSubmit } from '../../CreateToken.types';

interface TokenomicsFormProps {
	values: TokenomicsFormSubmit;
	onSubmit: (values: TokenomicsFormSubmit) => void;
	onClose: () => void;
}

export const TokenomicsForm: FC<TokenomicsFormProps> = ({
	values,
	onSubmit,
	onClose,
}) => (
	<Formik initialValues={values} onSubmit={onSubmit}>
		{({ submitForm }) => (
			<Form>
				<p>Insert tokenomics content here...</p>
				<FormFooter className={styles.TokenomicsFormFooter} onSubmit={submitForm} onCancel={onClose} />
			</Form>
		)}
	</Formik>
);
