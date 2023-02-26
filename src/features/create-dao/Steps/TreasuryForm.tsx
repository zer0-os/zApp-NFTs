import { FC, useContext } from 'react';

import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import { Wizard } from '@zero-tech/zui/components';
import { WrappedInput } from '../../ui/WrappedInput/WrappedInput';
import { CreateDAOFormContext } from '../';

import styles from './TreasuryForm.module.scss';
import classNames from 'classnames/bind';

const validationSchema = Yup.object().shape({
	gnosisSafe: Yup.string().required('The gnosis safe field is required.'),
});

export interface TreasuryFormProps {
	onClose: () => void;
}

const cx = classNames.bind(styles);

export const TreasuryForm: FC<TreasuryFormProps> = ({ onClose }) => {
	const { treasury, onTreasurySubmit } = useContext(CreateDAOFormContext);

	return (
		<Formik
			initialValues={treasury}
			onSubmit={(values) => onTreasurySubmit(values)}
			validationSchema={validationSchema}
		>
			{({ values, errors, touched, setFieldValue, submitForm }) => (
				<Form>
					<div>
						<WrappedInput
							label="What Ethereum address do you want all of the DAO’s funds to be held in?"
							value={values.gnosisSafe}
							placeholder="Enter gnosis safe address..."
							infoTooltipText="This is a smart contract wallet that allows users to store Ether and ERC-20 tokens securely and interact with the decentralized web. It requires minimum number of people to approve a transaction before it can occur."
							hasError={touched.gnosisSafe && !!errors.gnosisSafe}
							helperText={touched.gnosisSafe && errors.gnosisSafe}
							onChange={(value) => setFieldValue('gnosisSafe', value)}
						/>
						<a
							className={cx(styles.InputExtraInfo, {
								hasInputError: touched.gnosisSafe && !!errors.gnosisSafe,
							})}
							href="https://www.daomasters.xyz/tools/gnosis-safe#:~:text=Gnosis%20Safe%20is%20a%20smart,off%20on%20any%20fund%20transfers"
							target="_blank"
						>
							Learn More
						</a>
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
