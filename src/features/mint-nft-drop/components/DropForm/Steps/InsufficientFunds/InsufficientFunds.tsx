import { Button } from '@zero-tech/zui/components';

import { BigNumber } from 'ethers';

import styles from './InsufficientFunds.module.scss';

type InsufficientFundsProps = {
	onDismiss: () => void;
	pricePerNFT: BigNumber;
};

const InsufficientFunds = (props: InsufficientFundsProps) => {
	return (
		<section className={styles.Container}>
			<span>
				Insufficient funds. You must have at least{' '}
				<b>{props.pricePerNFT.toNumber()} ETH</b> in your wallet to mint GENs
			</span>
			<Button onPress={props.onDismiss}>Dismiss</Button>
		</section>
	);
};

export default InsufficientFunds;
