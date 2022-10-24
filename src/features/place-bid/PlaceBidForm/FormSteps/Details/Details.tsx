import { FC, useState } from 'react';

import { usePlaceBidData } from '../../../usePlaceBidData';
import { formatEthers } from '../../../../../lib/util/number';
import { truncateAddress } from '@zero-tech/zapp-utils/formatting/addresses';
import { truncateDomain } from '../../../../../lib/util/domains';

import { ViewBidsButton } from '../../../../../features/view-bids';
import { Button, Input, SkeletonText } from '@zero-tech/zui/components';
import { IpfsMedia } from '@zero-tech/zapp-utils/components';

import styles from './Details.module.scss';

import { IconUniswap, IconKucoin, IconGateio } from './Icons/';

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

	const buttonText =
		tokenBalance === '0.0' ? 'Cancel' : error ? 'Retry' : 'Continue';
	const isInputValueValid = !Number.isNaN(parseFloat(inputValue));
	const isDisabled = tokenBalance === '0.0' ? false : !isInputValueValid;

	const onChange = (val: string) => {
		setInputValue(val);
	};

	const onPress = tokenBalance === '0.0' ? onClose : onConfirm;

	const urlList = [
		{
			title: 'Uniswap',
			href: 'https://app.uniswap.org/#/swap?outputCurrency=0x2a3bff78b79a009976eea096a51a948a3dc00e34&inputCurrency=ETH&use=V2',
			icon: <IconUniswap />,
		},
		{
			title: 'Kucoin',
			href: 'https://www.kucoin.com/',
			icon: <IconKucoin />,
		},
		{
			title: 'Gate.io',
			href: 'https://www.gate.io/',
			icon: <IconGateio />,
		},
	];

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
							<ViewBidsButton isTextButton />
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
							<span className={styles.TextContent} data-variant={'warning'}>
								You need WILD tokens to bid on this domain. To buy WILD tokens
								simply go to one of the exhanges below and head back here when
								you’re ready.
							</span>

							<ul className={styles.ExternalUrls}>
								{urlList.map((item) => (
									<li key={item.title}>
										<a
											className={styles.Url}
											target="_blank"
											rel="noreferrer"
											href={item.href}
										>
											{item.icon}
											<p>{item.title}</p>
										</a>
									</li>
								))}
							</ul>
						</>
					)}

					{error !== undefined && <div className={styles.Error}>{error}</div>}

					<Button
						className={styles.Button}
						onPress={onPress}
						isDisabled={isDisabled}
						variant={tokenBalance === '0.0' ? 'negative' : 'primary'}
					>
						{buttonText}
					</Button>
				</div>
			</div>
		</>
	);
};
