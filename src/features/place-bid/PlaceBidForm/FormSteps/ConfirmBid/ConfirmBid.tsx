import { FC } from 'react';

import { usePlaceBidData } from '../../../usePlaceBidData';

import { NFTDetails } from '../../ui/NFTDetails';
import { Button } from '@zero-tech/zui/components';

import styles from '../FormSteps.module.scss';

interface ConfirmBidProps {
	error: string;
	domainId: string;
	bidAmount: string;
	onConfirm: (bidAmound: string) => void;
}

export const ConfirmBid: FC<ConfirmBidProps> = ({
	error,
	domainId,
	bidAmount,
	onConfirm,
}) => {
	const { domain } = usePlaceBidData(domainId);

	return (
		<>
			<NFTDetails domainId={domainId} />

			<div className={styles.Container}>
				<span className={styles.TextContent}>
					{`Are you sure you want to place a ${bidAmount} WILD bid for 0://${domain?.name}.`}
				</span>

				{error !== undefined && <div className={styles.Error}>{error}</div>}

				<Button className={styles.Button} onPress={() => onConfirm(bidAmount)}>
					Confirm
				</Button>
			</div>
		</>
	);
};
