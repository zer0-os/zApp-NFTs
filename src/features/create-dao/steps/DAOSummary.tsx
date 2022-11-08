import { FC, useContext, useState } from 'react';

import { Wizard } from '@zero-tech/zui/components';
import { MediaInput, MediaType } from '@zero-tech/zui/components/MediaInput';
import { CreateDAOFormContext } from '../';
import { DAOSummaryField } from './DAOSummaryField';

import styles from './DAOSummary.module.scss';
import { truncateAddress } from '../../../lib/util/domains/domains';

export interface DAOSummaryProps {
	onClose: () => void;
}

export const DAOSummary: FC<DAOSummaryProps> = ({ onClose }) => {
	const { details, governance, treasury, onLaunchSubmit, onDetailsChange } = useContext(CreateDAOFormContext);

	const [avatarHasError, setAvatarHasError] = useState(false);

	const onSubmit = async (): Promise<void> => {
		await onLaunchSubmit();
		onClose();
	};

	const onAvatarChange = (
		mediaType: MediaType,
		previewUrl: string,
		image: Buffer,
	): void => {
		setAvatarHasError(false);
		try {
			onDetailsChange({
				...details,
				mediaType: mediaType,
				previewUrl: previewUrl,
				avatar: image,
			});
		} catch (_) {
			setAvatarHasError(true);
		}
	};

	return (
		<div>
			<div className={styles.Row}>
				<div className={styles.Column}>
					<MediaInput
						className={styles.MediaInput}
						title="Upload token avatar..."
						subtitle="(Optional)"
						mediaType={details.mediaType}
						previewUrl={details.previewUrl}
						hasError={avatarHasError}
						onChange={onAvatarChange}
					/>
				</div>
				<div className={styles.Column}>
					<h2 className={styles.Heading}>Summary</h2>
					<div className={styles.Row_Summary}>
						<DAOSummaryField
							className={styles.Summary}
							label="DAO Name"
							value={details.name}
						/>
						<DAOSummaryField 
							label="zNA Address" 
							value={truncateAddress(details.znaAddress)} 
							className={styles.Summary_Second}
							/>
					</div>
					<div className={styles.Row_Summary}>
						<DAOSummaryField
							label="Voting Process"
							value={governance.votingProcess}
							className={styles.Summary}
						/>
						<DAOSummaryField
							label="Gnosis Safe"
							value={truncateAddress(treasury.gnosisSafe)}
							className={styles.Summary_Second}
						/>
					</div>
					<div className={styles.Row_Summary}>
						<DAOSummaryField
							className={styles.Summary}
							label="Voting Threshold"
							value={governance.votingThreshold}
							/>
						<DAOSummaryField
							label="Voting Period"
							value={governance.votingPeriod}
							className={styles.Summary_Second}
						/>
					</div>
				</div>
			</div>
			<DAOSummaryField
				label="Description"
				value={details.description}
				className={styles.Text_Description}
			/>
			<div className={styles.Text_Confirmation}>
				<div className={styles.Text_Bold}>Are you ready to launch your DAO?</div>
				<div className={styles.Text}>
					DAO details cannot be changed once it has been launched,
					<br/>
					only the avatar image can be changed.
				</div>
			</div>
			<Wizard.Buttons
				className={styles.Footer}
				isPrimaryButtonActive
				isSecondaryButtonActive
				primaryButtonText="Confirm"
				onClickPrimaryButton={onSubmit}
				onClickSecondaryButton={onClose}
			/>
		</div>
	);
};