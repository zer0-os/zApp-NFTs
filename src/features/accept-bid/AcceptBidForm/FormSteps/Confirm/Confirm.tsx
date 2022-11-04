import { FC } from 'react';

import { formatEthers } from '../../../../../lib/util';
import { useAcceptBidData } from '../../../useAcceptBidData';
import { truncateAddress } from '@zero-tech/zapp-utils/formatting/addresses';
import { Bid } from '@zero-tech/zauction-sdk';

import { NFTDetails, TextContent, TextContentProps } from '../ui';
import { Wizard, ButtonsProps } from '@zero-tech/zui/components/Wizard';

import styles from '../FormSteps.module.scss';

export interface ConfirmProps {
	zna: string;
	bid: Bid;
	errorText: TextContentProps['errorText'];
	onConfirm: (bid: Bid) => void;
}

export const Confirm: FC<ConfirmProps> = ({
	zna,
	bid,
	errorText,
	onConfirm,
}) => {
	const { paymentTokenSymbol } = useAcceptBidData(zna);

	const bidder = truncateAddress(bid?.bidder);
	const bidAmount = formatEthers(bid?.amount);
	const textContent = `Are you sure you want to accept a bid of ${bidAmount} ${paymentTokenSymbol} and transfer ownership of 0://${zna} to ${bidder}?`;

	const primaryButtonText: ButtonsProps['primaryButtonText'] = errorText
		? 'Retry'
		: 'Continue';

	const onConfirmAcceptBid = () => onConfirm(bid);

	return (
		<>
			<NFTDetails zna={zna} />

			<div className={styles.Container}>
				<TextContent textContent={textContent} errorText={errorText} />

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
