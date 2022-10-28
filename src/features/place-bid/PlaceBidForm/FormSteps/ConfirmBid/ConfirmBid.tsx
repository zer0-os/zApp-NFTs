import { FC } from 'react';

import { usePlaceBidData } from '../../../usePlaceBidData';

import { NFTDetails } from '../../ui/NFTDetails';
import { Wizard } from '@zero-tech/zui/components';

import styles from '../FormSteps.module.scss';

interface ConfirmBidProps {
	error: string;
	zna: string;
	bidAmount: string;
	onConfirm: (bidAmound: string) => void;
}

export const ConfirmBid: FC<ConfirmBidProps> = ({
	error,
	zna,
	bidAmount,
	onConfirm,
}) => {
	return (
		<>
			<NFTDetails zna={zna} />

			<div className={styles.Container}>
				<span className={styles.TextContent}>
					{`Are you sure you want to place a ${bidAmount} WILD bid for 0://${zna}.`}
				</span>

				{error !== undefined && <div className={styles.Error}>{error}</div>}

				<Wizard.Buttons
					className={styles.Button}
					isPrimaryButtonActive
					primaryButtonText="Confirm"
					onClickPrimaryButton={() => onConfirm(bidAmount)}
				/>
			</div>
		</>
	);
};
