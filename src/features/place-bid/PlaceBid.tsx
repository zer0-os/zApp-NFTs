import { FC } from 'react';

import { useWeb3 } from '../../lib/hooks/useWeb3';

import { PlaceBidForm } from './PlaceBidForm/PlaceBidForm';
import { ConnectWallet } from '../ui/ConnectWallet';

export interface PlaceBidProps {
	domainId: string;
}

export const PlaceBid: FC<PlaceBidProps> = ({ domainId }) => {
	const { account } = useWeb3();

	const content = account ? (
		<PlaceBidForm domainId={domainId} />
	) : (
		<ConnectWallet message={'Connect your wallet to place a bid.'} />
	);

	return content;
};
