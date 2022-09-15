//- React Imports
import { FC } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

//- Style Imports
import styles from './DetailsForm.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

//- Component Imports
import {
	MediaInput,
	MediaType,
} from '@zero-tech/zui/src/components/MediaInput';

import { WrappedInput } from '../../WrappedInput/WrappedInput';
import { FormFooter } from '../FormFooter/FormFooter';

//- Type Imports
import { DetailsFormSubmit } from '../../CreateToken.types';

const validationSchema = Yup.object().shape({
	name: Yup.string().required('This field is required'),
	symbol: Yup.string().required('This field is required'),
});

interface DetailsFormProps {
	values: DetailsFormSubmit;
	onSubmit: (values: DetailsFormSubmit) => void;
	onClose: () => void;
}

export const DetailsForm: FC<DetailsFormProps> = ({
	values,
	onSubmit,
	onClose,
}) => {
	const handleMediaInputChange = (
		mediaType: MediaType,
		previewUrl: string,
		image: Buffer,
		setFieldValue: (
			field: string,
			value: any,
			shouldValidate?: boolean,
		) => void,
	): void => {
		setFieldValue('mediaType', mediaType);
		setFieldValue('previewUrl', previewUrl);
		setFieldValue('avatar', image);
	};

	return (
		<Formik
			initialValues={values}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ values, errors, touched, setFieldValue, submitForm }) => (
				<Form>
					<div className={styles.DetailsFormRow}>
						<div className={styles.DetailsFormColumn}>
							<MediaInput
								className={styles.DetailsFormMediaInput}
								title="Upload token avatar..."
								subtitle="(Optional)"
								mediaType={values.mediaType}
								previewUrl={values.previewUrl}
								hasError={false}
								onChange={(
									mediaType: MediaType,
									previewImage: string,
									image: Buffer,
								) =>
									handleMediaInputChange(
										mediaType,
										previewImage,
										image,
										setFieldValue,
									)
								}
							/>
						</div>
						<div
							className={cx(
								styles.DetailsFormColumn,
								styles.DetailsFormColumnTwo,
							)}
						>
							<div className={styles.DetailsFormName}>
								<WrappedInput
									label="What is the name of your token?"
									value={values.name}
									placeholder="Enter name..."
									info="Points for creativity."
									hasError={touched.name && !!errors.name}
									helperText={touched.name && errors.name}
									onChange={(value) => setFieldValue('name', value)}
								/>
							</div>
							<WrappedInput
								label="What is your token symbol?"
								value={values.symbol}
								placeholder="Enter symbol..."
								info="Bitcoin's symbol is BTC. This short name will appear on the exhanges and is no more than 5 characters."
								hasError={touched.symbol && !!errors.symbol}
								helperText={touched.symbol && errors.symbol}
								onChange={(value) => setFieldValue('symbol', value)}
							/>
						</div>
					</div>
					<FormFooter className={styles.DetailsFormFooter} onSubmit={submitForm} onCancel={onClose} />
				</Form>
			)}
		</Formik>
	);
};
