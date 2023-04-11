import { Button } from '@zero-tech/zui/components';

import styles from './InsufficientFunds.module.scss';

type InsufficientFundsProps = {
	onDismiss: () => void;
	pricePerNFT: number;
};

const InsufficientFunds = (props: InsufficientFundsProps) => {
	return (
		<section className={styles.Container}>
			<span>
				Insufficient funds. You must have at least{' '}
				<b>{props.pricePerNFT} ETH</b> in your wallet to mint GENs
			</span>
			<Button onPress={props.onDismiss}>Dismiss</Button>
		</section>
	);
};

export default InsufficientFunds;
