import { FC } from 'react';

import { useAcceptBidData } from '../../../useAcceptBidData';

import { NFTDetails } from '../../ui/NFTDetails';
import { Button } from '@zero-tech/zui/components';

import styles from '../FormSteps.module.scss';

interface ConfirmProps {
	error: string;
	domainId: string;
	bidAmount: string;
	onConfirm: (bidAmound: string) => void;
}

export const Confirm: FC<ConfirmProps> = ({
	error,
	domainId,
	bidAmount,
	onConfirm,
}) => {
	const { domain } = useAcceptBidData(domainId);

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
