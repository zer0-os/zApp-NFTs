//- React Imports
import React, { FC, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

//- Style Imports
import styles from './DetailsForm.module.scss';

//- Component Imports
import { WrappedInput } from '../../WrappedInput/WrappedInput';
import {
	MediaInput,
	MediaType,
} from '@zero-tech/zui/src/components/MediaInput';

//- Type Imports
import { DetailsFormSubmit } from '../../CreateToken.types';
import { Button } from '@zero-tech/zui/src/components/Button';

const validationSchema = Yup.object().shape({
	name: Yup.string().required('This field is required'),
	symbol: Yup.string().required('This field is required'),
});

interface DetailsFormProps {
	onSubmit: (values: DetailsFormSubmit) => void;
}

export const DetailsForm: FC<DetailsFormProps> = ({ onSubmit }) => {
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
		setPreviewUrl(previewUrl)
	};

	return (
		<Formik
			initialValues={{
				avatar: null,
				name: '',
				symbol: '',
			}}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ values, errors, setFieldValue, submitForm }) => (
				<Form>
					<div className={styles.DetailsFormRow}>
						<div className={styles.DetailsFormColumn}>
							<MediaInput
								className={styles.DetailsFormMediaInput}
								title="Upload Token Avatar..."
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
									value={values.name}
									placeholder="Enter name..."
									info=""
									hasError={!!errors.name}
									helperText={errors.name}
									onChange={(value) => setFieldValue("name", value)}
								/>
							</div>
							<WrappedInput
								value={values.symbol}
								placeholder="Enter symbol..."
								info="Bitcoin's symbol is BTC. This short name will appear on the exhanges and is no more than 5 characters."
								hasError={!!errors.symbol}
								helperText={errors.symbol}
								onChange={(value) => setFieldValue("symbol", value)}
							/>
						</div>
					</div>
					<div className={styles.DetailsFormFooter}>
						<Button className={styles.DetailsFormFooterCancel} variant='negative'>Cancel</Button>
						<Button onPress={submitForm}>Next</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};
