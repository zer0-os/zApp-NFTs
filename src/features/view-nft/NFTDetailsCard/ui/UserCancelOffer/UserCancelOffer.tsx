import { FC } from 'react';

import { useActionsData } from '../../useActionsData';
import { formatEthers } from '../../../../../lib/util';

import { CancelBidButton } from '../../../../cancel-bid';

import styles from './UserCancelOffer.module.scss';

export interface UserCancelOfferProps {
	zna: string;
}

export const UserCancelOffer: FC<UserCancelOfferProps> = ({ zna }) => {
	const { highestUserBid, paymentTokenSymbol } = useActionsData(zna);

	const highestUserBidString = highestUserBid
		? formatEthers(highestUserBid?.amount)
		: '-';

	return (
		<div className={styles.Container}>
			<span>
				{`Your highest offer: ${highestUserBidString} ${paymentTokenSymbol}`}
			</span>
			<CancelBidButton zna={zna} trigger={'Cancel offer'} variant={'text'} />
		</div>
	);
};
