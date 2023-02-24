import { FC, useState } from 'react';

import { useDomainSettingsData } from '../hooks';
import { Metadata } from '../../../lib/types/metadata';
import { ConfirmActionType, FieldValues, FormStep } from '..';

import { Media, Switch, TextArea } from '../../ui';
import { DetailsStepFooter, CompleteStepFooter } from './Footers';
import { InfoTooltip } from '@zero-tech/zui/components/InfoTooltip';
import { Input, LoadingIndicator, Step } from '@zero-tech/zui/components';

import styles from './DetailsStep.module.scss';

interface DetailsFormProps {
	zna: string;
	stepId: string;
	errorText: string;
	confirmActionType?: ConfirmActionType;
	onLockMetadataStatus?: () => void;
	onStepUpdate: (step: Step) => void;
	onTitleUpdate?: (title: string) => void;
	onFormDetailsSubmit?: (values: FieldValues) => void;
	onConfirmActionUpdate: (action: ConfirmActionType) => void;
	onClose?: () => void;
}

export const DetailsForm: FC<DetailsFormProps> = ({
	zna,
	stepId,
	errorText,
	confirmActionType,
	onLockMetadataStatus,
	onStepUpdate,
	onTitleUpdate,
	onFormDetailsSubmit,
	onConfirmActionUpdate,
	onClose,
}) => {
	const {
		metadata,
		imageAlt,
		imageSrc,
		isMetadataLocked,
		isLoadingSettingsData,
	} = useDomainSettingsData(zna);

	const [title, setTitle] = useState<string>(metadata?.title);
	const [isBiddable, setIsBiddable] = useState<boolean>(metadata?.isBiddable);
	const [isMintable, setIsMintable] = useState<boolean>(metadata?.isMintable);
	const [description, setDescription] = useState<string>(metadata?.description);
	const [gridViewByDefault, setGridViewByDefault] = useState<boolean>(
		metadata?.gridViewByDefault,
	);

	const [customDomainHeader, setCustomDomainHeader] = useState<boolean>(
		metadata?.customDomainHeader,
	);

	const [customDomainHeaderValue, setCustomDomainHeaderValue] =
		useState<string>(
			(metadata?.customDomainHeaderValue as string) || undefined,
		);

	const onSubmit = (
		action: ConfirmActionType,
		step: Step,
		formHeader: string,
	) => {
		onConfirmActionUpdate(action);
		onStepUpdate(step);
		onTitleUpdate(formHeader);
		onFormDetailsSubmit({
			title,
			description,
			isMintable,
			isBiddable,
			gridViewByDefault,
			customDomainHeader,
			customDomainHeaderValue,
		});
	};

	const isDisabled = isMetadataLocked || stepId === FormStep.COMPLETE;

	return !isLoadingSettingsData ? (
		<div className={styles.FormContainer}>
			<div
				className={styles.ScrollSection}
				data-variant={isDisabled ? 'locked' : 'unlocked'}
			>
				<div className={styles.DetailsContainer}>
					<Media alt={imageAlt} src={imageSrc} />

					<InputWrapper
						zna={zna}
						title={title}
						setTitle={setTitle}
						isDisabled={isDisabled}
					/>
				</div>

				<TextArea
					value={description}
					label={'Description'}
					placeholder={'Description'}
					maxLength={400}
					minLength={0}
					isDisabled={isDisabled}
					onChange={(value: string) => setDescription(value)}
					alert={{
						variant: 'error',
						text: description
							? '400 characters max'
							: 'The description field is required.',
					}}
				/>

				<div className={styles.SwitchSettingsContainer}>
					<h5>Advanced Domain Settings</h5>

					<div className={styles.SwitchGroup}>
						<SwitchGroup
							metadata={metadata}
							isMetadataLocked={isMetadataLocked}
							isDisabled={isDisabled}
							isMintable={isMintable}
							setIsMintable={setIsMintable}
							isBiddable={isBiddable}
							setIsBiddable={setIsBiddable}
							gridViewByDefault={gridViewByDefault}
							setGridViewByDefault={setGridViewByDefault}
							customDomainHeader={customDomainHeader}
							setCustomDomainHeader={setCustomDomainHeader}
							setCustomDomainHeaderValue={setCustomDomainHeaderValue}
						/>

						{customDomainHeader && (
							<CustomDomainHeaderInput
								customDomainHeaderValue={customDomainHeaderValue}
								setCustomDomainHeaderValue={setCustomDomainHeaderValue}
							/>
						)}
					</div>
				</div>
			</div>

			<Footer
				zna={zna}
				stepId={stepId}
				errorText={errorText}
				confirmActionType={confirmActionType}
				onStepUpdate={onStepUpdate}
				onConfirmActionUpdate={onConfirmActionUpdate}
				onLockMetadataStatus={onLockMetadataStatus}
				onSubmit={onSubmit}
				onClose={onClose}
			/>
		</div>
	) : (
		<LoadingIndicator text={'Loading data...'} />
	);
};

/*******************
 * InputWrapper
 *******************/

interface InputWrapperProps {
	zna: DetailsFormProps['zna'];
	title: string;
	setTitle: (value: string) => void;
	isDisabled: boolean;
}

const InputWrapper = ({
	zna,
	title,
	setTitle,
	isDisabled,
}: InputWrapperProps) => {
	return (
		<div className={styles.InputWrapper}>
			<Input
				className={styles.Input}
				type="text"
				label="Title"
				value={title}
				placeholder={'NFT Name'}
				isDisabled={isDisabled}
				onChange={(value: string) => setTitle(value)}
				error={Boolean(!title)}
				alert={
					Boolean(!title) && {
						variant: 'error',
						text: 'The title field is required.',
					}
				}
			/>

			<Input
				className={styles.Input}
				type="text"
				label="Subdomain Name"
				value={zna}
				placeholder={'Subdomain Name'}
				isDisabled
				onChange={() => {}}
			/>
		</div>
	);
};

/*******************
 * SwitchGroup
 *******************/

interface SwitchGroupProps {
	metadata: Metadata;
	isMetadataLocked: boolean;
	isDisabled: boolean;
	isMintable: boolean;
	setIsMintable: (value: boolean) => void;
	isBiddable: boolean;
	setIsBiddable: (value: boolean) => void;
	gridViewByDefault: boolean;
	setGridViewByDefault: (value: boolean) => void;
	customDomainHeader: boolean;
	setCustomDomainHeader: (value: boolean) => void;
	setCustomDomainHeaderValue: (value: string) => void;
}

const SwitchGroup = ({
	metadata,
	isMetadataLocked,
	isDisabled,
	isMintable,
	setIsMintable,
	isBiddable,
	setIsBiddable,
	gridViewByDefault,
	setGridViewByDefault,
	customDomainHeader,
	setCustomDomainHeader,
	setCustomDomainHeaderValue,
}: SwitchGroupProps) => {
	return (
		<>
			<div className={styles.SwitchRow}>
				<Switch
					label={'Domain Mint Requests'}
					toggled={isMintable}
					isDisabled={isDisabled}
					onPress={() => {
						setIsMintable(!isMintable);
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
					toggled={isBiddable}
					isDisabled={isDisabled}
					onPress={() => {
						setIsBiddable(!isBiddable);
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
					toggled={gridViewByDefault}
					isDisabled={isDisabled}
					onPress={() => {
						setGridViewByDefault(!gridViewByDefault);
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
					toggled={customDomainHeader}
					isDisabled={isDisabled}
					onPress={() => {
						setCustomDomainHeaderValue(
							(metadata?.customDomainHeaderValue as string) || undefined,
						);
						setCustomDomainHeader(!customDomainHeader);
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
		</>
	);
};

/**************************
 * CustomDomainHeaderInput
 **************************/

interface CustomDomainHeaderInputProps {
	customDomainHeaderValue: string;
	setCustomDomainHeaderValue: (value: string) => void;
}

const CustomDomainHeaderInput = ({
	customDomainHeaderValue,
	setCustomDomainHeaderValue,
}: CustomDomainHeaderInputProps) => {
	return (
		<Input
			className={styles.SwitchInput}
			type="text"
			value={customDomainHeaderValue}
			placeholder={'Custom Domain Header'}
			onChange={(value: string) => setCustomDomainHeaderValue(value)}
			error={!customDomainHeaderValue}
			alert={
				!customDomainHeaderValue && {
					variant: 'error',
					text: 'Please enter a custom header if selected.',
				}
			}
		/>
	);
};

/*************
 * Footer
 *************/

interface FooterProps {
	zna: string;
	stepId: string;
	errorText: string;
	confirmActionType: ConfirmActionType;
	onLockMetadataStatus?: () => void;
	onStepUpdate: (step: Step) => void;
	onConfirmActionUpdate: (action: ConfirmActionType) => void;
	onSubmit: (action: ConfirmActionType, step: Step, formHeader: string) => void;
	onClose: () => void;
}

const Footer = ({
	zna,
	stepId,
	errorText,
	confirmActionType,
	onLockMetadataStatus,
	onStepUpdate,
	onConfirmActionUpdate,
	onSubmit,
	onClose,
}: FooterProps) => {
	return (
		<>
			{stepId === FormStep.DETAILS && (
				<DetailsStepFooter
					zna={zna}
					errorText={errorText}
					onSubmit={onSubmit}
				/>
			)}

			{stepId === FormStep.COMPLETE && (
				<CompleteStepFooter
					errorText={errorText}
					confirmActionType={confirmActionType}
					onConfirmActionUpdate={onConfirmActionUpdate}
					onStepUpdate={onStepUpdate}
					onLockMetadataStatus={onLockMetadataStatus}
					onClose={onClose}
				/>
			)}
		</>
	);
};
