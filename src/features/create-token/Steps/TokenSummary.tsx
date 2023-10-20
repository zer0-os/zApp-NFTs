import { FC, useContext, useState } from 'react';

import { Wizard, MediaInput, MediaType } from '@zero-tech/zui';
import { truncateAddress } from '@zero-tech/zapp-utils/formatting/addresses';
import { TokenSummaryField } from '.';
import { CreateTokenFormContext } from '..';

import styles from './TokenSummary.module.scss';

export interface TokenSummaryProps {
	onClose: () => void;
}

export const TokenSummary: FC<TokenSummaryProps> = ({ onClose }) => {
	const { details, onDetailsChange, tokenomics, onLaunchSubmit } = useContext(
		CreateTokenFormContext,
	);

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
					<div className={styles.Row}>
						<TokenSummaryField
							className={styles.Name}
							label="Token Name"
							value={details.name}
						/>
						<TokenSummaryField label="Symbol" value={details.symbol} />
					</div>
					<TokenSummaryField
						label="Total Supply"
						value={tokenomics.tokenCount}
					/>
					<div className={styles.Row}>
						<TokenSummaryField
							className={styles.InitialTokenSupplyWalletAddress}
							label="Initial Wallet Address"
							value={truncateAddress(
								tokenomics.initialTokenSupplyWalletAddress,
							)}
						/>
						<TokenSummaryField
							label="Admin Address"
							value={truncateAddress(tokenomics.adminWalletAddress)}
						/>
					</div>
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
