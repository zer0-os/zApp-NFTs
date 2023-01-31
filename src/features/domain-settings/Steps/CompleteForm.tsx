import { FC, useContext } from 'react';

import { DomainSettingsFormContext } from '..';
import { getDomainId } from '../../../lib/util';
import { useDomainData, useDomainMetadata } from '../../../lib/hooks';

import { Media, Switch } from '../../ui';
import { Button, Input } from '@zero-tech/zui/components';
import { IconLock1, IconLockUnlocked1 } from '@zero-tech/zui/components/Icons';

import styles from './CompleteForm.module.scss';

interface CompleteFormProps {
	zna: string;
	onClose: () => void;
}

export const CompleteForm: FC<CompleteFormProps> = ({ zna, onClose }) => {
	const { confirmActionType } = useContext(DomainSettingsFormContext);

	const domainId = getDomainId(zna);
	const { data: domain } = useDomainData(domainId);
	const { data: metadata } = useDomainMetadata(domainId);

	const imageSrc =
		metadata?.animation_url || metadata?.image_full || metadata?.image || '';
	const imageAlt = `${metadata?.title ?? 'loading'} nft image`;

	return (
		<div className={styles.FormContainer}>
			<div className={styles.FormBody}>
				<div className={styles.DetailsContainer}>
					<Media alt={imageAlt} src={imageSrc} />

					<div className={styles.InputWrapper}>
						<Input
							className={styles.Input}
							type="text"
							label="Title"
							value={metadata?.title}
							placeholder={'NFT Name'}
							isDisabled
							onChange={() => {}}
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
				</div>

				<Input
					className={styles.TextArea}
					type="text"
					label="Description"
					value={metadata?.description}
					placeholder={'Description'}
					isDisabled
					onChange={() => {}}
				/>

				<div className={styles.SwitchSettingsContainer}>
					<h5>Advanced Domain Settings</h5>

					<div className={styles.SwitchGroup}>
						<div className={styles.SwitchRow}>
							<Switch
								label={'Domain Mint Requests'}
								toggled={metadata?.isMintable}
								isDisabled
								onPress={() => {}}
							/>
						</div>

						<div className={styles.SwitchRow}>
							<Switch
								label={'Domain Bidding'}
								toggled={metadata?.isBiddable}
								isDisabled
								onPress={() => {}}
							/>
						</div>

						<div className={styles.SwitchRow}>
							<Switch
								label={'Domain in Grid View by Default'}
								toggled={metadata?.gridViewByDefault}
								isDisabled
								onPress={() => {}}
							/>
						</div>

						<div className={styles.SwitchRow}>
							<Switch
								label={'Custom Domain Header'}
								toggled={metadata?.customDomainHeader}
								isDisabled
								onPress={() => {}}
							/>
						</div>
					</div>
				</div>
			</div>

			<label className={styles.Label}>
				{confirmActionType === 'save-and-lock'
					? 'Your changes have been saved and the metadata is locked'
					: confirmActionType === 'unlock'
					? 'Success. Metadata is unlocked'
					: 'Your changes have been saved'}
			</label>

			<div className={styles.Buttons}>
				<>
					{domain?.isLocked ? (
						<IconLock1 className={styles.LockedIcon} />
					) : (
						<IconLockUnlocked1 className={styles.UnlockedIcon} />
					)}
					<Button onPress={onClose}>{'Finish'}</Button>
				</>
			</div>
		</div>
	);
};
