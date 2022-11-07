import { FC } from 'react';

import { useCancelBidData } from '../../../useCancelBidData';

import { NFTDetails, TextContentProps } from '../ui';
import { SkeletonText } from '@zero-tech/zui/components';
import { Wizard, ButtonsProps } from '@zero-tech/zui/components/Wizard';

import styles from '../FormSteps.module.scss';

export interface DetailsProps {
	zna: string;
	errorText: TextContentProps['errorText'];
	onNext: ButtonsProps['onClickPrimaryButton'];
}

export const Details: FC<DetailsProps> = ({ zna, errorText, onNext }) => {
	const { tokenBalanceString: tokenBalance, isLoading } = useCancelBidData(zna);

	const primaryButtonText: ButtonsProps['primaryButtonText'] = errorText
		? 'Retry'
		: 'Continue';

	return (
		<>
			<NFTDetails zna={zna} />

			<div className={styles.Container}>
				<UserBalance tokenBalance={tokenBalance} isLoading={isLoading} />

				<Wizard.Buttons
					className={styles.Button}
					isPrimaryButtonActive
					primaryButtonText={primaryButtonText}
					onClickPrimaryButton={onNext}
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
	isLoading: boolean;
}

const UserBalance = ({ tokenBalance, isLoading }: UserBalanceProps) => {
	return (
		<div className={styles.UserBalanceContainer}>
			<label className={styles.Label}>{'Your Balance'}</label>
			<SkeletonText
				className={styles.Balance}
				as={'span'}
				asyncText={{ text: tokenBalance, isLoading: isLoading }}
			/>
		</div>
	);
};
