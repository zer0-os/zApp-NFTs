import { FC, useState } from 'react';

import { truncateAddress } from '../../../../../lib/util/domains/domains';
import { formatEthers } from '../../../../../lib/util/number';

import { ViewBidsButton } from '../../../../../features/view-bids';
import { IpfsMedia } from '@zero-tech/zapp-utils/components';
import { Input, Wizard } from '@zero-tech/zui/components';

import styles from './Details.module.scss';

interface DetailsProps {
	zna: string;
	title: string;
	highestBid: string;
	creator: string;
	walletTokenBalance: string;
	image: string;
	imageFull: string;
	error: string;
	onConfirm: () => void;
}

export const Details: FC<DetailsProps> = ({
	zna,
	title,
	highestBid,
	creator,
	walletTokenBalance,
	image,
	imageFull,
	error,
	onConfirm,
}) => {
	const [inputValue, setInputValue] = useState<string>('');

	const truncatedCreatorAddress = truncateAddress(creator);

	// TODO: from zApp-utils ?
	const formattedHighestBid = formatEthers(highestBid);

	const primaryButtonText =
		walletTokenBalance === '0.0' ? 'Buy Wild' : error ? 'Retry' : 'Continue';
	const isInputValueValid = !Number.isNaN(parseFloat(inputValue));
	const isDisabled = walletTokenBalance === '0.0' ? false : !isInputValueValid;

	const onChange = (val: string) => {
		setInputValue(val);
	};

	const onClose = () => console.log('onClose click');

	const onSubmit = () =>
		walletTokenBalance === '0.0' ? console.log('Buy Wild') : onConfirm();

	// <SkeletonText
	// 	as={'span'}
	// 	asyncText={{
	// 		text: truncatedCreatorAddress,
	// 		isLoading: !truncatedCreatorAddress,
	// 	}}
	// 	className={styles.InfoValue}
	// />;

	return (
		<>
			<div className={styles.Container}>
				<div className={styles.NFTSection}>
					<div className={styles.Media}>
						<IpfsMedia
							alt={`${title ?? 'loading'} nft image`}
							className={styles.Image}
							src={imageFull ?? image}
						/>
					</div>
					<div className={styles.Details}>
						<h1 className={styles.Title}>{'NFT TITLE'}</h1>
						<span className={styles.ZNA}>0://{zna}</span>

						<span className={styles.InfoTitle}>{'Highest Bid'}</span>
						<span className={styles.InfoValue}>{formattedHighestBid}</span>
						<span className={styles.InfoTitle}>{'Creator'}</span>
						<span className={styles.InfoValue}>{truncatedCreatorAddress}</span>

						<div className={styles.ActionContainer}>
							{/* TODO: add correct button styles */}
							<ViewBidsButton />
						</div>
					</div>
				</div>

				<div className={styles.InputSection}>
					{walletTokenBalance !== '0.0' && (
						<>
							<div className={styles.TextContent}>
								Enter the amount you wish to bid:
							</div>

							<Input
								value={inputValue}
								label={`Your balance: ${walletTokenBalance}`}
								type="text"
								inputMode="numeric"
								placeholder={'Bid Amount (WILD)'}
								onChange={onChange}
								error={inputValue.length > 0 && !isInputValueValid}
							/>
						</>
					)}

					{walletTokenBalance === '0.0' && (
						<>
							<div className={styles.TextContent} data-variant={'warning'}>
								You need WILD tokens to bid on this domain.
							</div>
						</>
					)}

					{error !== undefined && <div className={styles.Error}>{error}</div>}

					<Wizard.Buttons
						isPrimaryButtonActive={!isDisabled}
						isSecondaryButtonActive
						primaryButtonText={primaryButtonText}
						secondaryButtonText={'Cancel'}
						onClickPrimaryButton={onSubmit}
						onClickSecondaryButton={walletTokenBalance === '0.0' && onClose}
					/>
				</div>
			</div>
		</>
	);
};
