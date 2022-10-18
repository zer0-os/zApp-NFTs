import { FC, useContext, useState } from 'react';

import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import { MediaInput, MediaType } from '@zero-tech/zui/components/MediaInput';
import { Wizard } from '@zero-tech/zui/components';
import { WrappedInput } from '../../ui/WrappedInput/WrappedInput';
import { CreateDAOFormContext } from '../';

import styles from './DetailsForm.module.scss';
import classNames from 'classnames/bind';

const validationSchema = Yup.object().shape({
	name: Yup.string().required('The name field is required.'),
	znaAddress: Yup.string().required('The zNA address field is required.'),
	description: Yup.string().required('The description field is required.'),
});

export interface DetailsFormProps {
	onClose: () => void;
}

export const DetailsForm: FC<DetailsFormProps> = ({ onClose }) => {
	const { details, onDetailsSubmit } = useContext(CreateDAOFormContext);

	const [avatarHasError, setAvatarHasError] = useState(false);

	const onAvatarChange = (
		mediaType: MediaType,
		previewUrl: string,
		image: Buffer,
		setFieldValue: (
			field: string,
			value: any,
			shouldValidate?: boolean,
		) => void,
	): void => {
		setAvatarHasError(false);
		try {
			setFieldValue('mediaType', mediaType);
			setFieldValue('previewUrl', previewUrl);
			setFieldValue('avatar', image);
		} catch (_) {
			setAvatarHasError(true);
		}
	};

	return (
		<Formik
			initialValues={details}
			onSubmit={(values) => onDetailsSubmit(values)}
			validationSchema={validationSchema}
		>
			{({ values, errors, touched, setFieldValue, submitForm }) => (
				<Form>
					<div className={styles.Row}>
						<div className={styles.Column}>
							<MediaInput
								className={styles.MediaInput}
								title="Upload DAO avatar..."
								subtitle="(Optional)"
								mediaType={values.mediaType}
								previewUrl={values.previewUrl}
								hasError={avatarHasError}
								onChange={(
									mediaType: MediaType,
									previewImage: string,
									image: Buffer,
								) =>
									onAvatarChange(mediaType, previewImage, image, setFieldValue)
								}
							/>
						</div>
						<div className={classNames(styles.Column, styles.ColumnTwo)}>
							<WrappedInput
								label="What is the name of your DAO?"
								value={values.name}
								placeholder="Enter name..."
								info="Points for creativity."
								hasError={touched.name && !!errors.name}
								helperText={touched.name && errors.name}
								onChange={(value) => setFieldValue('name', value)}
							/>
							<WrappedInput
								label="What will be the zNA address of your DAO be?"
								value={values.znaAddress}
								placeholder="Enter zNA address..."
								info="This will be the zNA address of your DAO and must not be taken already. An example can be 0://name.dao or 0://wilder.dao."
								hasError={touched.znaAddress && !!errors.znaAddress}
								helperText={touched.znaAddress && errors.znaAddress}
								onChange={(value) => setFieldValue('znaAddress', value)}
							/>
						</div>
					</div>
					<div className={styles.Description}>
						<WrappedInput
							label="What is the description of your DAO?"
							value={values.description}
							placeholder="Enter description..."
							info="Enter a description or story for your DAO. Maximum of 400 characters. "
							hasError={touched.description && !!errors.description}
							helperText={touched.description && errors.description}
							onChange={(value) => setFieldValue('description', value)}
						/>
					</div>
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
