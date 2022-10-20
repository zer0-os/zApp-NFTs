import { FC } from 'react';

import { useWeb3 } from '../../lib/hooks/useWeb3';

import { PlaceBidForm } from './PlaceBidForm/PlaceBidForm';
import { ConnectWallet } from '../ui/ConnectWallet';

export const PlaceBid: FC = () => {
	const { account } = useWeb3();

	const content = account ? (
		<PlaceBidForm />
	) : (
		<ConnectWallet message={'Connect your wallet to place a bid.'} />
	);

	return content;
};
