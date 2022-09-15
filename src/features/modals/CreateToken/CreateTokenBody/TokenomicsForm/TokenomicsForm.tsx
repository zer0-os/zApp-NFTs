//- React Imports
import React, { FC } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

//- Style Imports
import styles from "./TokenomicsForm.module.scss";

//- Component Imports
import { FormFooter } from '../FormFooter/FormFooter';
import { WrappedInput } from '../../WrappedInput/WrappedInput';

//- Type Imports
import { TokenomicsFormSubmit } from '../../CreateToken.types';

const validationSchema = Yup.object().shape({
	tokenCount: Yup.string().required('This field is required'),
	initialWalletAddress: Yup.string().required('This field is required'),
	adminWalletAddress: Yup.string().required('This field is required'),
});

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
	<Formik initialValues={values} onSubmit={onSubmit} validationSchema={validationSchema}>
		{({ submitForm, touched, errors, setFieldValue }) => (
			<Form>
				<WrappedInput
					className={styles.TokenomicsFormInput}
					type="number"
					label="How many tokens do you want to create?"
					value={values.tokenCount}
					placeholder="Enter total supply..."
					info="Initial number of tokens available. This will be put into an initial wallet account."
					hasError={touched.tokenCount && !!errors.tokenCount}
					helperText={touched.tokenCount && errors.tokenCount}
					onChange={(value) => setFieldValue('tokenCount', value)}
				/>
				<WrappedInput
					className={styles.TokenomicsFormInput}
					label="Where do you want to send your initial token supply?"
					value={values.initialWalletAddress}
					placeholder="Enter initial wallet address..."
					info="Usually the creator's wallet address and the tokens will be sent here first."
					hasError={touched.initialWalletAddress && !!errors.initialWalletAddress}
					helperText={touched.initialWalletAddress && errors.initialWalletAddress}
					onChange={(value) => setFieldValue('initialWalletAddress', value)}
				/>
				<WrappedInput
					className={styles.TokenomicsFormInput}
					label="What wallet should hold the admin permissions?"
					value={values.adminWalletAddress}
					placeholder="Enter admin wallet address..."
					info="Wallet address who will have the power to upgrade the contract if they wish. This can be the same as initial wallet address."
					hasError={touched.adminWalletAddress && !!errors.adminWalletAddress}
					helperText={touched.adminWalletAddress && errors.adminWalletAddress}
					onChange={(value) => setFieldValue('adminWalletAddress', value)}
				/>
				<FormFooter className={styles.TokenomicsFormFooter} onSubmit={submitForm} onCancel={onClose} />
			</Form>
		)}
	</Formik>
);
