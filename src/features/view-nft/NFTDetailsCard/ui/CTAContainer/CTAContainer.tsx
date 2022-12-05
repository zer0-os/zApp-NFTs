import { FC } from 'react';

import { useActionsData } from '../../useActionsData';

import {
	OwnerOfferAction,
	OwnerSetBuyNowAction,
	UserBuyNowAction,
	UserOfferAction,
} from '..';

import styles from './CTAContainer.module.scss';

export interface CTAContainerProps {
	zna: string;
}

export const CTAContainer: FC<CTAContainerProps> = ({ zna }) => {
	const { isDomainBiddable, isBuyNow, isOwnedByUser } = useActionsData(zna);

	return (
		<div className={styles.Container}>
			{isDomainBiddable && !isBuyNow && <UserOfferAction zna={zna} />}
			{isBuyNow && <UserBuyNowAction zna={zna} />}
			{isOwnedByUser && (
				<>
					<OwnerOfferAction zna={zna} />
					<OwnerSetBuyNowAction zna={zna} />
				</>
			)}
		</div>
	);
};
