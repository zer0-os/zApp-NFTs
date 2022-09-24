import { FC } from 'react';

import { useWeb3 } from '../../lib/hooks/useWeb3';

import { ConnectWallet } from '../../features/ui/ConnectWallet';

export const BuyNow: FC = () => {
	const { account } = useWeb3();

	const content = account ? (
		<>Buy Now</>
	) : (
		<ConnectWallet message={'Connect your wallet to buy now.'} />
	);

	return content;
};
