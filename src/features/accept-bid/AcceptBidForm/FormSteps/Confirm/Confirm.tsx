import { FC } from 'react';

import { formatEthers } from '../../../../../lib/util';
import { useAcceptBidData } from '../../../useAcceptBidData';
import { truncateAddress } from '@zero-tech/zapp-utils/formatting/addresses';
import { Bid } from '@zero-tech/zauction-sdk';

import { NFTDetails } from '../../ui/NFTDetails';
import { Button } from '@zero-tech/zui/components';

import styles from '../FormSteps.module.scss';

interface ConfirmProps {
	zna: string;
	bid: Bid;
	error: string;
	onConfirm: (bid: Bid) => void;
}

export const Confirm: FC<ConfirmProps> = ({ zna, bid, error, onConfirm }) => {
	const { paymentTokenLabel } = useAcceptBidData(zna);
	return (
		<>
			<NFTDetails zna={zna} />

			<div className={styles.Container}>
				<span className={styles.TextContent}>
					{`Are you sure you want to accept a bid of ${formatEthers(
						bid?.amount,
					)} ${paymentTokenLabel} and transfer ownership of 0://${zna} to ${truncateAddress(
						bid?.bidder,
					)}`}
					?
				</span>

				{error !== undefined && <div className={styles.Error}>{error}</div>}

				{/* // use wizard */}
				<Button className={styles.Button} onPress={() => onConfirm(bid)}>
					Confirm
				</Button>
			</div>
		</>
	);
};
