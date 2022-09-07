import { FC } from 'react';

import { useWeb3 } from '../../lib/hooks/useWeb3';

import { ConnectWallet } from '../../features/ui/ConnectWallet';

export const CancelBid: FC = () => {
	const { account } = useWeb3();

	const content = account ? (
		<>Cancel Bid</>
	) : (
		<ConnectWallet message={'Connect your wallet.'} />
	);

	return content;
};
