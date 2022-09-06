//- React Imports
import React, { FC } from 'react';
import { Form, Formik } from 'formik';

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
				<FormFooter onSubmit={submitForm} onCancel={onClose} />
			</Form>
		)}
	</Formik>
);
