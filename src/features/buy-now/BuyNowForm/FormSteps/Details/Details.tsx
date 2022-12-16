import { FC } from 'react';

import { useBuyNowData } from '../../../useBuyNowData';
import { Step } from '../../FormSteps/hooks';
import { NFTDetails } from '../ui';
import { SkeletonText } from '@zero-tech/zui/components';
import { Wizard, ButtonsProps } from '@zero-tech/zui/components/Wizard';

import styles from '../FormSteps.module.scss';

export interface DetailsProps {
	zna: string;
	step: Step;
	errorText: string;
	onCheckZAuction?: () => void;
	onConfirmBuyNow?: () => void;
}

export const Details: FC<DetailsProps> = ({
	zna,
	step,
	errorText,
	onCheckZAuction,
	onConfirmBuyNow,
}) => {
	const {
		balanceAsString: tokenBalance,
		paymentTokenSymbol,
		isLoading,
	} = useBuyNowData(zna);

	const primaryButtonText: ButtonsProps['primaryButtonText'] =
		step === Step.DETAILS ? (errorText ? 'Retry' : 'Continue') : 'Confirm';

	const primaryButtonEvent: ButtonsProps['onClickPrimaryButton'] =
		step === Step.DETAILS ? onCheckZAuction : onConfirmBuyNow;

	return (
		<>
			<NFTDetails zna={zna} />

			<div className={styles.Container}>
				<UserBalance
					tokenBalance={tokenBalance}
					paymentTokenSymbol={paymentTokenSymbol}
					isLoading={isLoading}
				/>

				<Wizard.Buttons
					className={styles.Button}
					isPrimaryButtonActive
					primaryButtonText={primaryButtonText}
					onClickPrimaryButton={primaryButtonEvent}
				/>
			</div>
		</>
	);
};

/**************
 * UserBalance
 **************/

interface UserBalanceProps {
	tokenBalance: string;
	paymentTokenSymbol: string;
	isLoading: boolean;
}

const UserBalance = ({
	tokenBalance,
	paymentTokenSymbol,
	isLoading,
}: UserBalanceProps) => {
	return (
		<div className={styles.UserBalanceContainer}>
			<label className={styles.Label}>{'Your Balance'}</label>
			<SkeletonText
				className={styles.Balance}
				as={'span'}
				asyncText={{
					text: `${tokenBalance} ${paymentTokenSymbol}`,
					isLoading: isLoading,
				}}
			/>
		</div>
	);
};
