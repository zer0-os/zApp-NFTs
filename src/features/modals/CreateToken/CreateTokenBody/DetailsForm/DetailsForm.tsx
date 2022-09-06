//- React Imports
import React, { FC, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

//- Style Imports
import styles from './DetailsForm.module.scss';

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
	const [mediaType, setMediaType] = useState<MediaType | undefined>();
	const [previewUrl, setPreviewUrl] = useState('');

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
		setFieldValue('avatar', image);
		setMediaType(mediaType);
		setPreviewUrl(previewUrl);
	};

	return (
		<Formik
			initialValues={values}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ values, errors, setFieldValue, submitForm }) => (
				<Form>
					<div className={styles.DetailsFormRow}>
						<div className={styles.DetailsFormColumn}>
							<MediaInput
								className={styles.DetailsFormMediaInput}
								title="Upload token avatar..."
								subtitle="(Optional)"
								mediaType={mediaType}
								previewUrl={previewUrl}
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
						<div className={styles.DetailsFormColumn}>
							<div>
								<WrappedInput
									label="What is the name of your token?"
									value={values.name}
									placeholder="Enter name..."
									info="Points for creativity."
									hasError={!!errors.name}
									helperText={errors.name}
									onChange={(value) => setFieldValue('name', value)}
								/>
							</div>
							<WrappedInput
								label="What is your token symbol?"
								value={values.symbol}
								placeholder="Enter symbol..."
								info="Bitcoin's symbol is BTC. This short name will appear on the exhanges and is no more than 5 characters."
								hasError={!!errors.symbol}
								helperText={errors.symbol}
								onChange={(value) => setFieldValue('symbol', value)}
							/>
						</div>
					</div>
					<FormFooter onSubmit={submitForm} onCancel={onClose} />
				</Form>
			)}
		</Formik>
	);
};