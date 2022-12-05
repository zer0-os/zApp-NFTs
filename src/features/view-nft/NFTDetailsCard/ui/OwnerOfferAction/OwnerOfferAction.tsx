import { FC } from 'react';

import { useActionsData } from '../../useActionsData';
import { formatEthers } from '../../../../../lib/util';

import { ViewBidsButton } from '../../../../view-bids';
import { DomainSettingsButton } from '../../../../domain-settings';
import { TextStack } from '@zero-tech/zui/components';

import styles from './OwnerOfferAction.module.scss';

export interface OwnerOfferActionProps {
	zna: string;
}

export const OwnerOfferAction: FC<OwnerOfferActionProps> = ({ zna }) => {
	const { highestBid, paymentTokenSymbol, isDomainBiddable, isLoading } =
		useActionsData(zna);

	const highestBidString = highestBid ? formatEthers(highestBid?.amount) : '-';

	const fiatValue = isDomainBiddable
		? Boolean(highestBid)
			? // TODO: wild to usd conversion here
			  '1,200,000'
			: 'No offers yet'
		: 'Bidding disabled';

	const label = Boolean(highestBid)
		? `Highest offer ${paymentTokenSymbol}`
		: 'Your current offer';

	const button = isDomainBiddable ? (
		<ViewBidsButton zna={zna} trigger={'View offers'} />
	) : (
		<DomainSettingsButton zna={zna} trigger={'Enable offers'} />
	);

	return (
		<div className={styles.Container}>
			<TextStack
				className={styles.PrimaryAction}
				label={label}
				primaryText={{
					text: (
						<TextValue tokenValue={highestBidString} fiatValue={fiatValue} />
					),
					isLoading: isLoading,
				}}
				secondaryText={{
					text: !Boolean(highestBid) && button,
					isLoading: isLoading,
				}}
			/>
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
