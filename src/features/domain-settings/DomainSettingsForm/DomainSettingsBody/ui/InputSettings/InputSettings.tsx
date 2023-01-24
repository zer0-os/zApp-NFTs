import { FC } from 'react';

import {
	ERROR_KEYS,
	useDomainSettingsData,
} from '../../../../useDomainSettingsData';

import { Media, TextArea } from '../../../../../ui';
import { Input } from '@zero-tech/zui/components';

import styles from './InputSettings.module.scss';

enum AlertVariant {
	SUCCESS = 'success',
	ERROR = 'error',
	WARNING = 'warning',
	INFO = 'info',
}

export interface InputSettingsProps {
	zna: string;
}

export const InputSettings: FC<InputSettingsProps> = ({ zna }) => {
	const { localState, localActions, imageAlt, imageSrc } =
		useDomainSettingsData(zna);

	const titleAlert = localState.errors[ERROR_KEYS.NAME] && {
		variant: AlertVariant.ERROR,
		text: localState.errors[ERROR_KEYS.NAME],
	};

	const descriptionAlert = {
		variant: AlertVariant.ERROR,
		text: '400 characters max',
	};

	const onTitleChange = (event: any) => {
		localActions.setTitle(event?.target?.value);
	};

	const onDescriptionChange = (event: any) => {
		localActions.setDescription(event?.target?.value);
	};

	return (
		<>
			<div className={styles.Container}>
				<Media alt={imageAlt} src={imageSrc} />

				<div className={styles.InputWrapper}>
					<Input
						className={styles.Input}
						type={'text'}
						label={'Title'}
						placeholder={'NFT Name'}
						alert={titleAlert}
						value={localState.title}
						isDisabled={localState.isMetadataLocked}
						error={!!localState.errors[ERROR_KEYS.NAME]}
						onChange={onTitleChange}
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
			</div>

			<TextArea
				label={'Description'}
				alert={descriptionAlert}
				maxLength={400}
				description={localState.description}
				placeholder={'(400 characters max)'}
				isDisabled={localState.isMetadataLocked}
				onChange={onDescriptionChange}
			/>
		</>
	);
};
