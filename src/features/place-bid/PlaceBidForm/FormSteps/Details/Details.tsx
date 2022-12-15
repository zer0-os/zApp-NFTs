import { FC } from 'react';

import { usePlaceBidData } from '../../../usePlaceBidData';

import { ExternalLinks, NFTDetails, TextContent } from '../ui';
import { ErrorText } from '../ui/ErrorText/ErrorText';
import { Input } from '@zero-tech/zui/components/Input';
import { Button } from '@zero-tech/zui/components/Button';

import styles from '../FormSteps.module.scss';

export interface DetailsProps {
	zna: string;
	errorText: string;
	bidAmount: string;
	setBidAmount?: (bid: string) => void;
	onCheckZAuction?: () => void;
	onClose: () => void;
}

export const Details: FC<DetailsProps> = ({
	zna,
	errorText,
	bidAmount,
	setBidAmount,
	onCheckZAuction,
	onClose,
}) => {
	const { tokenBalanceString: tokenBalance } = usePlaceBidData(zna);

	const isTokenBalance = tokenBalance !== '0.0';

	const isInputValueValid =
		Number(bidAmount) && !Number.isNaN(parseFloat(bidAmount));

	const onPress = isTokenBalance ? onCheckZAuction : onClose;

	const isDisabled = isTokenBalance ? !isInputValueValid : false;

	const buttonText = isTokenBalance
		? errorText
			? 'Retry'
			: 'Continue'
		: 'Cancel';

	const buttonVariant = !isTokenBalance ? 'negative' : 'primary';

	const primaryTextContent = 'Enter the amount you wish to bid:';

	const secondaryTextContent =
		'You need WILD tokens to bid on this domain. To buy WILD tokens simply go to one of the exhanges below and head back here when you’re ready.';

	// const onChange = (val: string) => {
	// 	setBidAmount(val);
	// };

	return (
		<>
			<NFTDetails zna={zna} />

			<div className={styles.Container}>
				{isTokenBalance && (
					<>
						<TextContent textContent={primaryTextContent} />

						<Input
							value={bidAmount ?? ''}
							label={`Your balance: ${tokenBalance}`}
							type="text"
							inputMode="numeric"
							placeholder={'Bid Amount (WILD)'}
							onChange={(text: string) => setBidAmount && setBidAmount(text)}
							error={bidAmount?.length > 0 && !isInputValueValid}
						/>
					</>
				)}

				{!isTokenBalance && (
					<>
						<TextContent
							variant={'warning'}
							textContent={secondaryTextContent}
						/>

						<ExternalLinks />
					</>
				)}

				{errorText !== undefined && <ErrorText text={errorText} />}

				<Button
					className={styles.Button}
					onPress={onPress}
					isDisabled={isDisabled}
					variant={buttonVariant}
				>
					{buttonText}
				</Button>
			</div>
		</>
	);
};
