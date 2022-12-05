import { FC } from 'react';

import { useActionsData } from '../../useActionsData';
import { formatEthers } from '../../../../../lib/util';

import { PlaceBidButton } from '../../../../place-bid';
import { CancelBidButton } from '../../../../cancel-bid';
import { TextStack } from '@zero-tech/zui/components';

import styles from './UserOfferAction.module.scss';

export interface UserOfferActionProps {
	zna: string;
}

export const UserOfferAction: FC<UserOfferActionProps> = ({ zna }) => {
	const {
		highestBid,
		highestUserBid,
		paymentTokenSymbol,
		isUserBid,
		isLoading,
	} = useActionsData(zna);

	const highestBidString = highestBid ? formatEthers(highestBid?.amount) : '-';

	const highestUserBidString = highestUserBid
		? formatEthers(highestUserBid?.amount)
		: '-';

	const fiatValue = Boolean(highestBidString)
		? // TODO: update to display wild to usd conversion
		  'No offers yet'
		: 'No offers yet';

	return (
		<div className={styles.Container}>
			<TextStack
				className={styles.PrimaryAction}
				label={`Highest offer ${paymentTokenSymbol}`}
				primaryText={{
					text: (
						<TextValue tokenValue={highestBidString} fiatValue={fiatValue} />
					),
					isLoading: isLoading,
				}}
				secondaryText={{
					text: <PlaceBidButton zna={zna} trigger={'Make offer'} />,
					isLoading: isLoading,
				}}
			/>

			{!isUserBid && (
				<div className={styles.SecondaryAction}>
					<span className={styles.Subtext}>
						{`Your highest offer: ${highestUserBidString} ${paymentTokenSymbol}`}
					</span>
					<CancelBidButton
						zna={zna}
						trigger={'Cancel offer'}
						variant={'text'}
					/>
				</div>
			)}
		</div>
	);
};

/************
 * TextValue
 ************/

interface TextValueProps {
	tokenValue: string;
	fiatValue: string;
}

const TextValue = ({ tokenValue, fiatValue }: TextValueProps) => (
	<div className={styles.Values}>
		<span className={styles.TokenValue}>{tokenValue}</span>
		<span className={styles.FiatValue}>{fiatValue}</span>
	</div>
);
