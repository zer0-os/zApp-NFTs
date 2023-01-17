import { FC, HTMLAttributes } from 'react';

import {
	ERROR_KEYS,
	useDomainSettingsData,
} from '../../../useDomainSettingsData';

import { Switch } from '../../ui';
import { Button, Input } from '@zero-tech/zui/components';
import { IpfsMedia } from '@zero-tech/zapp-utils/components';
import { InfoTooltip } from '@zero-tech/zui/components/InfoTooltip';

import styles from '../FormSteps.module.scss';

export interface DetailsProps {
	zna: string;
	errorText: string;
}

export const Details: FC<DetailsProps> = ({ zna, errorText }) => {
	const { localState, localActions, formattedData, imageAlt, imageSrc } =
		useDomainSettingsData(zna);

	return (
		<>
			<div
				className={styles.Container}
				data-variant={localState.isMetadataLocked ? 'locked' : 'unlocked'}
			>
				<div className={styles.FlexRowWrapper}>
					<Media alt={imageAlt} src={imageSrc} />
					<InputGroup
						zna={zna}
						title={localState.title}
						isDisabled={localState.isMetadataLocked}
						error={!!localState.errors[ERROR_KEYS.NAME]}
						errorMessage={localState.errors[ERROR_KEYS.NAME]}
						onChange={(event: any) =>
							localActions.setTitle(event?.target?.value)
						}
					/>
				</div>

				<TextArea
					label={'Story'}
					description={localState.description}
					placeholder={'Story (400 characters max)'}
					isDisabled={localState.isMetadataLocked}
					onChange={(event: any) =>
						localActions.setDescription(event?.target?.value)
					}
				/>

				<div className={styles.AdvancedSettings}>
					<h5>Advanced Domain Settings</h5>

					<div className={styles.SwitchGroup}>
						<div className={styles.SwitchRow}>
							<Switch
								label={'Domain Mint Requests'}
								toggled={localState.isMintable}
								isDisabled={localState.isMetadataLocked}
								onPress={localActions.setIsMintable}
							/>
							{!localState.isMetadataLocked && (
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
								toggled={localState.isBiddable}
								isDisabled={localState.isMetadataLocked}
								onPress={localActions.setIsBiddable}
							/>
							{!localState.isMetadataLocked && (
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
								toggled={localState.gridViewByDefault}
								isDisabled={localState.isMetadataLocked}
								onPress={localActions.setGridViewByDefault}
							/>
							{!localState.isMetadataLocked && (
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
								toggled={localState.customDomainHeader}
								isDisabled={localState.isMetadataLocked}
								onPress={localActions.setCustomDomainHeader}
							/>
							{!localState.isMetadataLocked && (
								<InfoTooltip
									content={
										'Change the first column header of list view. By default this is ‘Domain’.'
									}
								/>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className={styles.Buttons}>
				<Button>Unlock</Button>
			</div>
		</>
	);
};

/*******************
 * Media
 *******************/

interface MediaProps {
	alt: string;
	src: string;
}

const Media = ({ alt, src }: MediaProps) => {
	return (
		<div className={styles.Media}>
			<IpfsMedia className={styles.Image} alt={alt} src={src} />
		</div>
	);
};

/*******************
 * InputGroup
 *******************/

interface InputGroupProps {
	zna: string;
	error?: boolean;
	errorMessage?: string;
	title: string;
	isDisabled: boolean;
	onChange: (event: any) => void;
}

const InputGroup = ({
	zna,
	error,
	errorMessage,
	title,
	isDisabled,
	onChange,
}: InputGroupProps) => {
	return (
		<div className={styles.InputWrapper}>
			<Input
				className={styles.Input}
				type={'text'}
				label={'Title'}
				placeholder={'NFT Name'}
				value={title}
				isDisabled={isDisabled}
				onChange={onChange}
				error={error}
				alert={errorMessage && { variant: 'error', text: errorMessage }}
			/>

			<Input
				className={styles.Input}
				type={'text'}
				label={'Subdomain Name'}
				value={zna}
				isDisabled
				onChange={() => {}}
			/>
		</div>
	);
};

/*******************
 * TextArea
 *******************/

interface TextAreaProps {
	label?: string;
	description?: string;
	placeholder?: string;
	isDisabled?: boolean;
	onChange: (event: any) => void;
}

const TextArea = ({
	label,
	description,
	placeholder,
	isDisabled,
	onChange,
}: TextAreaProps) => {
	return (
		<>
			<div className={styles.TextAreaContainer}>
				{label && <label className={styles.TextAreaLabel}>{label}</label>}
				<textarea
					className={styles.TextArea}
					onChange={onChange}
					inputMode={'text'}
					placeholder={placeholder}
					value={description}
					disabled={isDisabled}
				/>
			</div>
		</>
	);
};