import { FC } from 'react';

import { useWeb3 } from '../../lib/hooks/useWeb3';

import { ConnectWallet } from '../ui/ConnectWallet';

export const SetBuyNow: FC = () => {
	const { account } = useWeb3();

	const content = account ? (
		<>Set Buy Now</>
	) : (
		<ConnectWallet message={'Connect your wallet to set buy now price.'} />
	);

	return content;
};
