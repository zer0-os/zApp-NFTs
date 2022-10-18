//- React Imports
import React, { FC } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

//- Style Imports
import styles from './TokenomicsForm.module.scss';

//- Component Imports
import { Wizard } from '@zero-tech/zui/components';
import { WrappedInput } from '../../ui/WrappedInput/WrappedInput';

//- Type Imports
import { TokenomicsFormSubmit } from '../CreateToken.types';

const validationSchema = Yup.object().shape({
	tokenCount: Yup.string().required('This field is required'),
	initialTokenSupplyWalletAddress: Yup.string().required(
		'This field is required',
	),
	adminWalletAddress: Yup.string().required('This field is required'),
});

export interface TokenomicsFormProps {
	values: TokenomicsFormSubmit;
	onSubmit: (values: TokenomicsFormSubmit) => void;
	onClose: () => void;
}

export const TokenomicsForm: FC<TokenomicsFormProps> = ({
	values,
	onSubmit,
	onClose,
}) => (
	<Formik
		initialValues={values}
		onSubmit={onSubmit}
		validationSchema={validationSchema}
	>
		{({ values, submitForm, touched, errors, setFieldValue }) => (
			<Form>
				<WrappedInput
					className={styles.Input}
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
					className={styles.Input}
					label="Where do you want to send your initial token supply?"
					value={values.initialTokenSupplyWalletAddress}
					placeholder="Enter initial wallet address..."
					info="Usually the creator's wallet address and the tokens will be sent here first."
					hasError={
						touched.initialTokenSupplyWalletAddress &&
						!!errors.initialTokenSupplyWalletAddress
					}
					helperText={
						touched.initialTokenSupplyWalletAddress &&
						errors.initialTokenSupplyWalletAddress
					}
					onChange={(value) =>
						setFieldValue('initialTokenSupplyWalletAddress', value)
					}
				/>
				<WrappedInput
					className={styles.Input}
					label="What wallet should hold the admin permissions?"
					value={values.adminWalletAddress}
					placeholder="Enter admin wallet address..."
					info="Wallet address who will have the power to upgrade the contract if they wish. This can be the same as initial wallet address."
					hasError={touched.adminWalletAddress && !!errors.adminWalletAddress}
					helperText={touched.adminWalletAddress && errors.adminWalletAddress}
					onChange={(value) => setFieldValue('adminWalletAddress', value)}
				/>
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
