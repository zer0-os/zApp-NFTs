import { FC, useState } from 'react';

import { usePlaceBidData } from '../../../../usePlaceBidData';

import { ExternalLinks } from '..';
import { FormErrorText, FormTextContent } from '../../../../../ui';
import { Input, Button } from '@zero-tech/zui/components';

import styles from '../../FormSteps.module.scss';

export interface FormInputProps {
	zna: string;
	errorText: string;
	onSubmit: (bidAmount: string) => void;
	onClose: () => void;
}

export const FormInput: FC<FormInputProps> = ({
	zna,
	errorText,
	onSubmit,
	onClose,
}) => {
	const { tokenBalanceString: tokenBalance } = usePlaceBidData(zna);

	const [bidAmount, setBidAmount] = useState<string>('');

	const isInputValueValid =
		Number(bidAmount) && !Number.isNaN(parseFloat(bidAmount));
	const isTokenBalance = tokenBalance !== '0.0';
	const isDisabled = isTokenBalance ? !isInputValueValid : false;
	const isError = bidAmount?.length > 0 && !isInputValueValid;

	const buttonVariant = !isTokenBalance ? 'negative' : 'primary';
	const primaryTextContent = 'Enter the amount you wish to bid:';
	const secondaryTextContent =
		'You need WILD tokens to bid on this domain. To buy WILD tokens simply go to one of the exhanges below and head back here when you’re ready.';
	const buttonText = isTokenBalance
		? errorText
			? 'Retry'
			: 'Continue'
		: 'Cancel';

	const onPress = () => {
		isTokenBalance ? onSubmit(bidAmount) : onClose();
	};

	const handleChange = (bid: string) => {
		setBidAmount(bid);
	};

	return (
		<div className={styles.Container}>
			{isTokenBalance && (
				<>
					<FormTextContent textContent={primaryTextContent} />

					<Input
						value={bidAmount}
						label={`Your balance: ${tokenBalance}`}
						type="text"
						inputMode="numeric"
						placeholder={'Bid Amount (WILD)'}
						onChange={handleChange}
						error={isError}
					/>
				</>
			)}

			{!isTokenBalance && (
				<>
					<FormTextContent
						variant={'warning'}
						textContent={secondaryTextContent}
					/>

					<ExternalLinks />
				</>
			)}

			{errorText !== undefined && <FormErrorText text={errorText} />}

			<Button
				className={styles.Button}
				onPress={onPress}
				isDisabled={isDisabled}
				variant={buttonVariant}
			>
				{buttonText}
			</Button>
		</div>
	);
};
