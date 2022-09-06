import { FC } from 'react';

import { useWeb3 } from '../../lib/hooks/useWeb3';

import { ConnectWallet } from '../ui/ConnectWallet';

export const ViewBids: FC = () => {
	const { account } = useWeb3();

	const content = account ? (
		<>View Bids</>
	) : (
		<ConnectWallet message={'Connect your wallet to view bids.'} />
	);

	return content;
};
