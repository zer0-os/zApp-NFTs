import { FC } from 'react';

import { formatEthers } from '../../../../../lib/util';
import { useAcceptBidData } from '../../../useAcceptBidData';
import { truncateAddress } from '@zero-tech/zui/utils';
import { Bid } from '@zero-tech/zauction-sdk';

import { NFTDetails, TextContent } from '../ui';
import { Wizard } from '@zero-tech/zui/components/Wizard';

import styles from '../FormSteps.module.scss';

export interface ConfirmProps {
	zna: string;
	bid: Bid;
	errorText: string;
	onConfirm: (bid: Bid) => void;
}

export const Confirm: FC<ConfirmProps> = ({
	zna,
	bid,
	errorText,
	onConfirm,
}) => {
	const { paymentTokenSymbol } = useAcceptBidData(zna);

	const bidder = bid?.bidder ? truncateAddress(bid?.bidder) : '-';
	const bidAmount = bid?.amount ? `${formatEthers(bid?.amount)}` : '-';

	const primaryButtonText = errorText ? 'Retry' : 'Continue';

	const onConfirmAcceptBid = () => onConfirm(bid);

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
					primaryButtonText={primaryButtonText}
					onClickPrimaryButton={onConfirmAcceptBid}
				/>
			</div>
		</>
	);
};
