import { FC } from 'react';

import { BuyNowButton } from '../../../../buy-now';
import { PlaceBidButton } from '../../../../place-bid';

import styles from './CTAContainer.module.scss';

export interface CTAContainerProps {
	zna: string;
}

export const CTAContainer: FC<CTAContainerProps> = ({
	zna,
}: CTAContainerProps) => {
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

			<PlaceBidButton zna={zna} variant={'text'} trigger={'or make an offer'} />
		</div>
	);
};
