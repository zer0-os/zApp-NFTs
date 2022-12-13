import { FC } from 'react';

import { useActionsData } from '../../useActionsData';
import { formatEthers } from '../../../../../lib/util';

import { TextValue } from '../TextValue';
import { ViewBidsButton } from '../../../../view-bids';
import { DomainSettingsButton } from '../../../../domain-settings';
import { TextStack } from '@zero-tech/zui/components';

import styles from '../ActionContainer/ActionContainer.module.scss';

export interface OwnerOfferActionProps {
	zna: string;
}

export const OwnerOfferAction: FC<OwnerOfferActionProps> = ({ zna }) => {
	const {
		highestBid,
		highestUserBid,
		paymentTokenSymbol,
		highestBidUsdConversionString,
		isDomainBiddable,
		isLoading,
	} = useActionsData(zna);

	const highestBidString = highestBid ? formatEthers(highestBid?.amount) : '-';

	const fiatValue = isDomainBiddable
		? Boolean(highestBid)
			? highestBidUsdConversionString
			: 'No offers yet'
		: 'Bidding disabled';

	const label = !Boolean(highestUserBid)
		? `Highest offer (${paymentTokenSymbol})`
		: 'Your current offer';

	const button = isDomainBiddable ? (
		<ViewBidsButton zna={zna} trigger={'View offers'} />
	) : (
		<DomainSettingsButton zna={zna} trigger={'Enable offers'} />
	);

	return (
		<div className={styles.ActionContent}>
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
					text: Boolean(highestBid) && button,
					isLoading: isLoading,
				}}
			/>
		</div>
	);
};
