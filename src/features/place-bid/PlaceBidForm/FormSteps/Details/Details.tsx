import { FC } from 'react';

import { usePlaceBidData } from '../../../usePlaceBidData';

import {
	ExternalLinks,
	NFTDetails,
	TextContent,
	TextContentProps,
} from '../ui';
import { ErrorText } from '../ui/ErrorText/ErrorText';
import { Input, InputProps } from '@zero-tech/zui/components/Input';
import { Button, ButtonProps } from '@zero-tech/zui/components/Button';

import styles from '../FormSteps.module.scss';

export interface DetailsProps {
	zna: string;
	errorText: string;
	bidAmount: string;
	setBidAmount?: InputProps['onChange'];
	onCheckZAuction?: ButtonProps['onPress'];
	onClose: ButtonProps['onPress'];
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

	const onPress: ButtonProps['onPress'] = isTokenBalance
		? onCheckZAuction
		: onClose;

	const isDisabled: ButtonProps['isDisabled'] = isTokenBalance
		? !isInputValueValid
		: false;

	const buttonText: ButtonProps['children'] = isTokenBalance
		? errorText
			? 'Retry'
			: 'Continue'
		: 'Cancel';

	const buttonVariant: ButtonProps['variant'] = !isTokenBalance
		? 'negative'
		: 'primary';

	const primaryTextContent: TextContentProps['textContent'] =
		'Enter the amount you wish to bid:';

	const secondaryTextContent: TextContentProps['textContent'] =
		'You need WILD tokens to bid on this domain. To buy WILD tokens simply go to one of the exhanges below and head back here when you’re ready.';

	const onChange = (val: string) => {
		setBidAmount(val);
	};

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
							onChange={onChange}
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
