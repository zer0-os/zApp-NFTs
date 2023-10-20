import { FC, useContext, useState } from 'react';

import { Wizard, MediaInput, MediaType } from '@zero-tech/zui';
import { truncateAddress } from '@zero-tech/zapp-utils/formatting/addresses';
import { CreateDAOFormContext } from '../';
import { DAOSummaryField } from './DAOSummaryField';

import styles from './DAOSummary.module.scss';
import classNames from 'classnames';

export interface DAOSummaryProps {
	onClose: () => void;
}

export const DAOSummary: FC<DAOSummaryProps> = ({ onClose }) => {
	const { details, governance, treasury, onLaunchSubmit, onDetailsChange } =
		useContext(CreateDAOFormContext);

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
		<>
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
					<div className={classNames(styles.Row, styles.SummaryRow)}>
						<div className={classNames(styles.Column, styles.SummaryColumn)}>
							<DAOSummaryField label="DAO Name" value={details.name} />
							<DAOSummaryField
								label="Voting Process"
								value={governance.votingProcess}
							/>
							<DAOSummaryField
								label="Voting Threshold"
								value={`${governance.votingThreshold}%`}
							/>
						</div>
						<div className={classNames(styles.Column, styles.SummaryColumn)}>
							<DAOSummaryField
								label="zNA Address"
								value={truncateAddress(details.znaAddress)}
							/>
							<DAOSummaryField
								label="Gnosis Safe"
								value={truncateAddress(treasury.gnosisSafe)}
							/>
							<DAOSummaryField
								label="Voting Period"
								value={governance.votingPeriod}
							/>
						</div>
					</div>
				</div>
			</div>
			<DAOSummaryField
				className={styles.Description}
				label="Description"
				value={details.description}
			/>
			<div className={styles.Confirmation}>
				<div className={styles.ConfirmationQuestion}>
					Are you ready to launch your DAO?
				</div>
				<div>
					DAO details cannot be changed once it has been launched,
					<br />
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
		</>
	);
};
