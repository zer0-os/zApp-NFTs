import { FC, useContext, useState } from 'react';

import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import { Wizard } from '@zero-tech/zui/components';
import { MediaInput, MediaType } from '@zero-tech/zui/components/MediaInput';
import { WrappedInput } from '../../ui/WrappedInput/WrappedInput';

import { CreateTokenFormContext } from '..';

import styles from './DetailsForm.module.scss';
import classNames from 'classnames';

const validationSchema = Yup.object().shape({
	name: Yup.string().required('The name field is required.'),
	symbol: Yup.string().required('The symbol field is required.'),
});

export interface DetailsFormProps {
	onClose: () => void;
}

export const DetailsForm: FC<DetailsFormProps> = ({ onClose }) => {
	const { details, onDetailsSubmit } = useContext(CreateTokenFormContext);

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
								title="Upload token avatar..."
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
								label="What is the name of your token?"
								value={values.name}
								placeholder="Enter name..."
								infoTooltipText="Points for creativity."
								hasError={touched.name && !!errors.name}
								helperText={touched.name && errors.name}
								onChange={(value) => setFieldValue('name', value)}
							/>
							<WrappedInput
								label="What is your token symbol?"
								value={values.symbol}
								placeholder="Enter symbol..."
								infoTooltipText="Bitcoin's symbol is BTC. This short name will appear on the exhanges and is no more than 5 characters."
								hasError={touched.symbol && !!errors.symbol}
								helperText={touched.symbol && errors.symbol}
								onChange={(value) => setFieldValue('symbol', value)}
							/>
						</div>
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
