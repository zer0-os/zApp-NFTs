import { FC, useContext } from 'react';

import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import { Wizard } from '@zero-tech/zui/components';
import {
	CreateDAOFormContext,
	getVotingPeriodItems,
	getVotingSystemItems,
	VOTING_PROCESS_OPTIONS,
} from '..';
import { WrappedToggleInput } from '../../ui/WrappedToggleInput/WrappedToggleInput';
import { WrappedDropdownMenu } from '../../ui/WrappedDropdownMenu/WrappedDropdownMenu';
import { WrappedInput } from '../../ui/WrappedInput/WrappedInput';

import styles from './GovernanceForm.module.scss';

const votingProcessInfo = `When a vote is being counted, this defines what percentage of voters is a passing vote.

For example if it is 50%; the absolute (quorum) would mean all possible tokens can vote. For majority (no quorum), just of the tokens which have voted. Using absolute (quorum) is recommended if you are worried about low vote participation.

You can click 'learn more' below for more info.`;

const validationSchema = Yup.object().shape({
	votingPeriod: Yup.string().required('The voting period field is required.'),
	votingSystem: Yup.string().required('The voting system field is required.'),
	daoTokenAddress: Yup.string().required(
		'The DAO token address field is required.',
	),
	votingThreshold: Yup.string().required(
		'The voting threshold field is required.',
	),
});

export interface GovernanceFormProps {
	onClose: () => void;
}

export const GovernanceForm: FC<GovernanceFormProps> = ({ onClose }) => {
	const { governance, onGovernanceSubmit } = useContext(CreateDAOFormContext);

	return (
		<Formik
			initialValues={governance}
			onSubmit={(values) => onGovernanceSubmit(values)}
			validationSchema={validationSchema}
		>
			{({ values, setFieldValue, submitForm, errors, touched }) => (
				<Form>
					<div className={styles.Row}>
						<div className={styles.VotingProcess}>
							<WrappedToggleInput
								options={VOTING_PROCESS_OPTIONS}
								label="Which will be your voting process?"
								value={values.votingProcess}
								info={votingProcessInfo}
								href="https://www.code2.io/blog/web3-dao-voting-mechanisms/#popular-voting-mechanisms-used-by-daos"
								onChange={(selection: string) =>
									setFieldValue('votingProcess', selection)
								}
							/>
						</div>
						<div className={styles.VotingPeriod}>
							<WrappedDropdownMenu
								value={values.votingPeriod}
								label="How long is the voting period?"
								placeholder="Select voting period..."
								items={getVotingPeriodItems(setFieldValue)}
								info="Points for creativity."
								hasError={touched.votingPeriod && !!errors.votingPeriod}
								helperText={touched.votingPeriod && errors.votingPeriod}
							/>
						</div>
					</div>
					<WrappedDropdownMenu
						className={styles.VotingSystem}
						value={values.votingSystem}
						label="What voting system do you prefer?"
						placeholder="Select voting system..."
						items={getVotingSystemItems(setFieldValue)}
						info="An existing company for the backend of the voting system. More will be added soon."
						hasError={touched.votingSystem && !!errors.votingSystem}
						helperText={touched.votingSystem && errors.votingSystem}
					/>
					<WrappedInput
						label="What wallet address will govern the DAO?"
						value={values.daoTokenAddress}
						placeholder="Enter DAO token address..."
						info="The wallet address that will the power and permissions of the DAO."
						hasError={touched.daoTokenAddress && !!errors.daoTokenAddress}
						helperText={touched.daoTokenAddress && errors.daoTokenAddress}
						onChange={(value) => setFieldValue('daoTokenAddress', value)}
					/>
					<WrappedInput
						type="number"
						label="What percentage will be your voting threshold?"
						value={values.votingThreshold}
						placeholder="Enter voting threshold..."
						info="Points for creativity."
						hasError={touched.votingThreshold && !!errors.votingThreshold}
						helperText={touched.votingThreshold && errors.votingThreshold}
						onChange={(value) => setFieldValue('votingThreshold', value)}
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
};
