import { FC } from 'react';

import { formatEthers } from '../../../../../lib/util';
import { useAcceptBidData } from '../../../useAcceptBidData';
import { truncateAddress } from '@zero-tech/zui/utils';
import { Bid } from '@zero-tech/zauction-sdk';

import { NFTDetails, TextContent } from '../ui';
import { Wizard } from '@zero-tech/zui/components/Wizard';

import styles from '../FormSteps.module.scss';

export interface DetailsProps {
	zna: string;
	bid: Bid;
	errorText: string;
	onClose: () => void;
	onCheckZAuction?: () => void;
}

export const Details: FC<DetailsProps> = ({
	zna,
	bid,
	errorText,
	onClose,
	onCheckZAuction,
}) => {
	const { paymentTokenSymbol } = useAcceptBidData(zna);

	const bidder = truncateAddress(bid?.bidder);
	const bidAmount = formatEthers(bid?.amount);

	const primaryButtonText = errorText ? 'Retry' : 'Continue';

	return (
		<>
			<NFTDetails zna={zna} />

			<div className={styles.Container}>
				<TextContent
					textContent={`Are you sure you want to accept a bid of ${bidAmount} ${paymentTokenSymbol} and transfer ownership of 0://${zna} to ${bidder}?`}
					errorText={errorText}
				/>

				<Wizard.Buttons
					className={styles.Button}
					isPrimaryButtonActive
					isSecondaryButtonActive
					primaryButtonText={primaryButtonText}
					secondaryButtonText="Cancel"
					onClickPrimaryButton={onCheckZAuction}
					onClickSecondaryButton={onClose}
				/>
			</div>
		</>
	);
};
