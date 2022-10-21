import { FC, useState } from 'react';

import { usePlaceBidData } from '../../../usePlaceBidData';
import { formatEthers } from '../../../../../lib/util/number';
import {
	truncateAddress,
	truncateDomain,
} from '../../../../../lib/util/domains';

import { ViewBidsButton } from '../../../../../features/view-bids';
import { Input, SkeletonText, Wizard } from '@zero-tech/zui/components';
import { IpfsMedia } from '@zero-tech/zapp-utils/components';

import styles from './Details.module.scss';

interface DetailsProps {
	domainId: string;
	tokenBalance: string;
	error: string;
	onConfirm: () => void;
	onClose: () => void;
}

export const Details: FC<DetailsProps> = ({
	domainId,
	tokenBalance,
	error,
	onConfirm,
	onClose,
}) => {
	const [inputValue, setInputValue] = useState<string>('');

	const {
		domain,
		isDomainLoading,
		metrics,
		isMetricsLoading,
		metadata,
		isMetadataLoading,
		imageAlt,
		imageSrc,
	} = usePlaceBidData(domainId);

	const truncatedZna = truncateDomain(domain?.name, 20);
	const truncatedCreatorAddress = truncateAddress(domain?.minter);
	const formattedHighestBid = formatEthers(metrics?.highestBid);

	const primaryButtonText =
		tokenBalance === '0.0' ? 'Buy Wild' : error ? 'Retry' : 'Continue';
	const isInputValueValid = !Number.isNaN(parseFloat(inputValue));
	const isDisabled = tokenBalance === '0.0' ? false : !isInputValueValid;

	const onChange = (val: string) => {
		setInputValue(val);
	};

	const onSubmit = () =>
		tokenBalance === '0.0' ? console.log('Buy Wild') : onConfirm();

	return (
		<>
			<div className={styles.Container}>
				<div className={styles.NFTSection}>
					<div className={styles.Media}>
						<IpfsMedia className={styles.Image} alt={imageAlt} src={imageSrc} />
					</div>
					<div className={styles.Details}>
						<SkeletonText
							className={styles.Title}
							as={'h1'}
							asyncText={{
								text: metadata?.title,
								isLoading: isMetadataLoading,
							}}
						/>

						<SkeletonText
							className={styles.ZNA}
							as={'span'}
							asyncText={{
								text: `0://${truncatedZna}`,
								isLoading: isDomainLoading,
							}}
						/>

						<span className={styles.InfoTitle}>{'Highest Bid'}</span>
						<SkeletonText
							className={styles.InfoValue}
							as={'span'}
							asyncText={{
								text: formattedHighestBid,
								isLoading: isMetricsLoading,
							}}
						/>

						<span className={styles.InfoTitle}>{'Creator'}</span>
						<SkeletonText
							className={styles.InfoValue}
							as={'span'}
							asyncText={{
								text: truncatedCreatorAddress,
								isLoading: isDomainLoading,
							}}
						/>

						<div className={styles.ActionContainer}>
							{/* TODO: add correct button styles */}
							<ViewBidsButton />
						</div>
					</div>
				</div>

				<div className={styles.InputSection}>
					{tokenBalance !== '0.0' && (
						<>
							<span className={styles.TextContent}>
								Enter the amount you wish to bid:
							</span>

							<Input
								value={inputValue}
								label={`Your balance: ${tokenBalance}`}
								type="text"
								inputMode="numeric"
								placeholder={'Bid Amount (WILD)'}
								onChange={onChange}
								error={inputValue.length > 0 && !isInputValueValid}
							/>
						</>
					)}

					{tokenBalance === '0.0' && (
						<>
							<span className={styles.TextContent}>
								Your balance: {tokenBalance}
							</span>

							<span className={styles.TextContent} data-variant={'warning'}>
								You need WILD tokens to bid on this domain.
							</span>
						</>
					)}

					{error !== undefined && <div className={styles.Error}>{error}</div>}

					<Wizard.Buttons
						isPrimaryButtonActive={!isDisabled}
						isSecondaryButtonActive
						primaryButtonText={primaryButtonText}
						secondaryButtonText={'Cancel'}
						onClickPrimaryButton={onSubmit}
						onClickSecondaryButton={tokenBalance === '0.0' && onClose}
					/>
				</div>
			</div>
		</>
	);
};
