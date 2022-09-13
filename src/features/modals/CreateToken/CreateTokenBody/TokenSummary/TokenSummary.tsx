//- React Imports
import React, { FC } from 'react';

//- Style Imports
import styles from './TokenSummary.module.scss';

//- Component Imports
import { FormFooter } from '../FormFooter/FormFooter';
import { TokenSummaryField } from './TokenSummaryField/TokenSummaryField';

import {
	MediaInput,
	MediaType,
} from '@zero-tech/zui/src/components/MediaInput';

interface TokenSummaryProps {
	mediaType: MediaType;
	previewUrl: string;
	tokenName: string;
	symbol: string;
	totalSupply: string;
	initialWalletAddress: string;
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
	initialWalletAddress,
	adminAddress,
	onMediaInputChange,
	onSubmit,
	onClose,
}) => (
	<>
		<div className={styles.TokenSummaryRow}>
			<div className={styles.TokenSummaryColumn}>
				<MediaInput
					className={styles.TokenSummaryMediaInput}
					title="Upload token avatar..."
					subtitle="(Optional)"
					mediaType={mediaType}
					previewUrl={previewUrl}
					hasError={false}
					onChange={onMediaInputChange}
				/>
			</div>
			<div className={styles.TokenSummaryColumn}>
				<h2 className={styles.TokenSummaryHeading}>Summary</h2>
				<div className={styles.TokenSummaryRow}>
					<TokenSummaryField
						className={styles.TokenSummaryName}
						label="Token Name"
						value={tokenName}
					/>
					<TokenSummaryField label="Symbol" value={symbol} />
				</div>
				<TokenSummaryField label="Total Supply" value={totalSupply} />
				<div className={styles.TokenSummaryRow}>
					<TokenSummaryField
						className={styles.TokenSummaryInitialWalletAddress}
						label="Initial Wallet Address"
						value={initialWalletAddress}
					/>
					<TokenSummaryField label="Admin Address" value={adminAddress} />
				</div>
			</div>
		</div>
		<FormFooter className={styles.TokenSummaryFooter} action="Confirm" onSubmit={onSubmit} onCancel={onClose} />
	</>
);
