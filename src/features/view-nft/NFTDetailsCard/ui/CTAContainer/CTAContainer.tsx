import { FC } from 'react';

import { BuyNowButton } from '../../../../buy-now';

import styles from './CTAContainer.module.scss';

export interface CTAContainerProps {}

export const CTAContainer: FC<CTAContainerProps> = ({}) => {
	return (
		<div className={styles.Container}>
			<div className={styles.Content}>
				<span className={styles.Label}>{'Buy Now (WILD)'}</span>
				<div className={styles.Values}>
					<span className={styles.TokenValue}>{'3,000,000.00'}</span>
					<span className={styles.FiatValue}>{'$12,000,000.00'}</span>
				</div>
			</div>

			<div className={styles.Button}>
				<BuyNowButton />
			</div>

			<div className={styles.TextButton}>Or make an offer</div>
		</div>
	);
};
