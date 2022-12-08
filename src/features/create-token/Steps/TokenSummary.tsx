import { FC } from 'react';

import { truncateAddress } from '@zero-tech/zui/utils';

import { TokenSummaryField } from './TokenSummaryField/TokenSummaryField';
import { Wizard } from '@zero-tech/zui/components';
import { MediaInput, MediaType } from '@zero-tech/zui/components/MediaInput';

import styles from './TokenSummary.module.scss';

export interface TokenSummaryProps {
	mediaType: MediaType;
	previewUrl: string;
	tokenName: string;
	symbol: string;
	totalSupply: string;
	initialTokenSupplyWalletAddress: string;
	adminAddress: string;
	onMediaInputChange: (
		mediaType: MediaType,
		previewUrl: string,
		image: Buffer,
	) => void;
	onSubmit: () => void;
	onClose: () => void;
}

export const TokenSummary: FC<TokenSummaryProps> = ({
	mediaType,
	previewUrl,
	tokenName,
	symbol,
	totalSupply,
	initialTokenSupplyWalletAddress,
	adminAddress,
	onMediaInputChange,
	onSubmit,
	onClose,
}) => (
	<>
		<div className={styles.Row}>
			<div className={styles.Column}>
				<MediaInput
					className={styles.MediaInput}
					title="Upload token avatar..."
					subtitle="(Optional)"
					mediaType={mediaType}
					previewUrl={previewUrl}
					hasError={false}
					onChange={onMediaInputChange}
				/>
			</div>
			<div className={styles.Column}>
				<h2 className={styles.Heading}>Summary</h2>
				<div className={styles.Row}>
					<TokenSummaryField
						className={styles.Name}
						label="Token Name"
						value={tokenName}
					/>
					<TokenSummaryField label="Symbol" value={symbol} />
				</div>
				<TokenSummaryField label="Total Supply" value={totalSupply} />
				<div className={styles.Row}>
					<TokenSummaryField
						className={styles.InitialTokenSupplyWalletAddress}
						label="Initial Wallet Address"
						value={truncateAddress(initialTokenSupplyWalletAddress)}
					/>
					<TokenSummaryField
						label="Admin Address"
						value={truncateAddress(adminAddress)}
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
