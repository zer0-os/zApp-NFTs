import { FC } from 'react';

import { Bid } from '@zero-tech/zauction-sdk';

import { NFTDetails } from '../../ui';
import { formatEthers } from '../../../../../lib/util';
import { useAcceptBidData } from '../../../useAcceptBidData';
import { truncateAddress } from '@zero-tech/zapp-utils/formatting/addresses';
import { Wizard } from '@zero-tech/zui/components';

import styles from '../FormSteps.module.scss';

interface DetailsProps {
	zna: string;
	bid: Bid;
	error: string;
	onClose: () => void;
	onCheckZAuction?: () => void;
}

export const Details: FC<DetailsProps> = ({
	zna,
	bid,
	error,
	onClose,
	onCheckZAuction,
}) => {
	const primaryButtonText = error ? 'Retry' : 'Continue';
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
