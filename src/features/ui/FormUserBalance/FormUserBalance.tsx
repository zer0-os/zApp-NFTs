import { SkeletonText } from '@zero-tech/zui/components';

import styles from './FormUserBalance.module.scss';

export interface FormUserBalanceProps {
	tokenBalance: string;
	isLoading: boolean;
}

export const FormUserBalance = ({
	tokenBalance,
	isLoading,
}: FormUserBalanceProps) => {
	return (
		<div className={styles.UserBalanceContainer}>
			<label className={styles.Label}>{'Your Balance'}</label>
			<SkeletonText
				className={styles.Balance}
				as={'span'}
				asyncText={{
					text: tokenBalance,
					isLoading: isLoading,
				}}
			/>
		</div>
	);
};
