import { FC } from 'react';

import { ExternalLinks, NFTDetails } from '../../ui';
import { Button, Input } from '@zero-tech/zui/components';

import styles from '../FormSteps.module.scss';

interface DetailsProps {
	error: string;
	zna: string;
	bidAmount: string;
	tokenBalance: string;
	setBidAmount?: (bidAmount: string) => void;
	onCheckZAuction?: () => void;
	onClose: () => void;
}

export const Details: FC<DetailsProps> = ({
	error,
	zna,
	bidAmount,
	tokenBalance,
	setBidAmount,
	onCheckZAuction,
	onClose,
}) => {
	const isTokenBalance = tokenBalance !== '0.0';
	const onPress = isTokenBalance ? onCheckZAuction : onClose;
	const isInputValueValid =
		Number(bidAmount) && !Number.isNaN(parseFloat(bidAmount));
	const isDisabled = isTokenBalance ? !isInputValueValid : false;
	const buttonText = isTokenBalance ? (error ? 'Retry' : 'Continue') : 'Cancel';

	const onChange = (val: string) => {
		setBidAmount(val);
	};

	return (
		<>
			<NFTDetails zna={zna} />

			<div className={styles.Container}>
				{isTokenBalance && (
					<>
						<span className={styles.TextContent}>
							Enter the amount you wish to bid:
						</span>

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
						<span className={styles.TextContent} data-variant={'warning'}>
							You need WILD tokens to bid on this domain. To buy WILD tokens
							simply go to one of the exhanges below and head back here when
							you’re ready.
						</span>

						<ExternalLinks />
					</>
				)}

				{error !== undefined && <div className={styles.Error}>{error}</div>}

				<Button
					className={styles.Button}
					onPress={onPress}
					isDisabled={isDisabled}
					variant={!isTokenBalance ? 'negative' : 'primary'}
				>
					{buttonText}
				</Button>
			</div>
		</>
	);
};
