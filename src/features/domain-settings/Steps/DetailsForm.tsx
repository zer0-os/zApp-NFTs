import { FC, useContext, useState } from 'react';

import { ConfirmActionType, DomainSettingsFormContext, steps } from '..';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { FormErrorText, Media, Switch } from '../../ui';
import { Button, Input } from '@zero-tech/zui/components';
import { InfoTooltip } from '@zero-tech/zui/components/InfoTooltip';
import { IconLock1, IconLockUnlocked1 } from '@zero-tech/zui/components/Icons';

import styles from './DetailsForm.module.scss';

const validationSchema = Yup.object().shape({
	title: Yup.string().required('The title field is required.'),
	zna: Yup.string().required('The name field is required.'),
	description: Yup.string().required('The description field is required.'),
});

interface DetailsFormProps {
	zna: string;
}

export const DetailsForm: FC<DetailsFormProps> = ({ zna }) => {
	const {
		// zna,
		details,
		imageAlt,
		imageSrc,
		errorText,
		onDetailsSubmit,
		onStepUpdate,
		isMetadataLocked,
		truncatedLockedByAddress,
		isLockedByOwner,
		onConfirmActionUpdate,
		onTitleUpdate,
	} = useContext(DomainSettingsFormContext);

	const [isMintableToggled, setIsMintableToggled] = useState<boolean>(
		details.isMintable,
	);
	const [isBiddableToggled, setIsBiddableToggled] = useState<boolean>(
		details.isBiddable,
	);
	const [isGridViewToggled, setIsGridViewToggled] = useState<boolean>(
		details.gridViewByDefault,
	);
	const [isCustomHeaderToggled, setIsCustomHeaderToggled] = useState<boolean>(
		details.customDomainHeader,
	);

	return (
		<Formik
			initialValues={details}
			onSubmit={(values) => onDetailsSubmit(values)}
			validationSchema={validationSchema}
		>
			{({ values, errors, touched, setFieldValue, submitForm }) => (
				<Form className={styles.FormContainer}>
					<div
						className={styles.ScrollSection}
						data-variant={isMetadataLocked ? 'locked' : 'unlocked'}
					>
						<div className={styles.DetailsContainer}>
							<Media alt={imageAlt} src={imageSrc} />

							<div className={styles.InputWrapper}>
								<Input
									className={styles.Input}
									type="text"
									label="Title"
									value={values.title}
									placeholder={'NFT Name'}
									error={touched.title && !!errors.title}
									helperText={touched.title && errors.title}
									isDisabled={isMetadataLocked}
									onChange={(value) => setFieldValue('title', value)}
								/>

								<Input
									className={styles.Input}
									type="text"
									label="Subdomain Name"
									value={zna}
									placeholder={'Subdomain Name'}
									isDisabled
									onChange={(value) => setFieldValue('zna', value)}
								/>
							</div>
						</div>

						<Input
							className={styles.TextArea}
							type="text"
							label="Description"
							value={values.description}
							placeholder={'Description'}
							error={touched.description && !!errors.description}
							helperText={touched.description && errors.description}
							isDisabled={isMetadataLocked}
							onChange={(value) => setFieldValue('description', value)}
						/>

						<div className={styles.SwitchSettingsContainer}>
							<h5>Advanced Domain Settings</h5>

							<div className={styles.SwitchGroup}>
								<div className={styles.SwitchRow}>
									<Switch
										label={'Domain Mint Requests'}
										toggled={isMintableToggled}
										isDisabled={isMetadataLocked}
										onPress={(value: boolean) => {
											setFieldValue('isMintable', value);
											setIsMintableToggled(!isMintableToggled);
										}}
									/>
									{!isMetadataLocked && (
										<InfoTooltip
											content={
												'Allow members to make a stake offer in order to mint NFTs on your domain. Turn off if your domain is not intended to be open for others to mint upon'
											}
										/>
									)}
								</div>

								<div className={styles.SwitchRow}>
									<Switch
										label={'Domain Bidding'}
										toggled={isBiddableToggled}
										isDisabled={isMetadataLocked}
										onPress={(value) => {
											setFieldValue('isBiddable', value);
											setIsBiddableToggled(!isBiddableToggled);
										}}
									/>
									{!isMetadataLocked && (
										<InfoTooltip
											content={
												'Allow bidding on your domain. Turn off if the domain is not intended to be sold.'
											}
										/>
									)}
								</div>

								<div className={styles.SwitchRow}>
									<Switch
										label={'Domain in Grid View by Default'}
										toggled={isGridViewToggled}
										isDisabled={isMetadataLocked}
										onPress={(value) => {
											setFieldValue('gridViewByDefault', value);
											setIsGridViewToggled(!isGridViewToggled);
										}}
									/>
									{!isMetadataLocked && (
										<InfoTooltip
											content={
												'Grid view has larger image previews which can benefit domains with a focus on art rather than statistics.'
											}
										/>
									)}
								</div>

								<div className={styles.SwitchRow}>
									<Switch
										label={'Custom Domain Header'}
										toggled={isCustomHeaderToggled}
										isDisabled={isMetadataLocked}
										onPress={(value) => {
											setFieldValue('customDomainHeader', value);
											setIsCustomHeaderToggled(!isCustomHeaderToggled);
										}}
									/>
									{!isMetadataLocked && (
										<InfoTooltip
											content={
												'Change the first column header of list view. By default this is `Domain`.'
											}
										/>
									)}
								</div>
							</div>
						</div>
					</div>

					{errorText && (
						<FormErrorText className={styles.ErrorText} text={errorText} />
					)}

					{!errorText && isMetadataLocked && (
						<label className={styles.Label}>
							{isLockedByOwner
								? 'Please unlock to make changes'
								: `You cannot unlock the metadata to make changes. \nIt was locked by ${truncatedLockedByAddress} `}
						</label>
					)}

					<div className={styles.Buttons}>
						{isMetadataLocked && isLockedByOwner && (
							<>
								<IconLock1 className={styles.LockedIcon} />
								<Button
									onPress={() => {
										submitForm;
										onConfirmActionUpdate(ConfirmActionType.UNLOCK);
										onStepUpdate(steps[1]);
										onTitleUpdate('Unlock Metadata?');
									}}
								>
									Unlock Metadata
								</Button>
							</>
						)}
						{isMetadataLocked && !isLockedByOwner && (
							<>
								<IconLock1 className={styles.LockedIcon} />
								<Button isDisabled>Metadata Locked</Button>
							</>
						)}
						{!isMetadataLocked && (
							<>
								<IconLockUnlocked1 className={styles.UnlockedIcon} />
								<Button
									onPress={() => {
										submitForm;
										onConfirmActionUpdate(
											ConfirmActionType.SAVE_WITHOUT_LOCKING,
										);
										onStepUpdate(steps[1]);
										onTitleUpdate('Save Without Locking?');
									}}
								>
									Save Changes
								</Button>
								<Button
									onPress={() => {
										submitForm;
										onConfirmActionUpdate(ConfirmActionType.SAVE_AND_LOCK);
										onStepUpdate(steps[1]);
										onTitleUpdate('Save & Lock?');
									}}
								>
									Save and Lock
								</Button>
							</>
						)}
						<InfoTooltip
							content={
								isMetadataLocked
									? 'Metadata is locked. Only the person who locked it may unlock and make changes.'
									: 'You may save changes leaving the metadata unlocked for the next owner to edit, or save & lock the metadata preventing future edits by anyone other than you.'
							}
						/>
					</div>
				</Form>
			)}
		</Formik>
	);
};
