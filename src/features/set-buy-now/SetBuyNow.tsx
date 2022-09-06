//- React Imports
import { FC } from 'react';

//- Hooks Imports
import { useWeb3 } from '../../lib/hooks/useWeb3';

//- Components Imports
import { ConnectWallet } from '../ui/ConnectWallet';

export const SetBuyNow: FC = () => {
	const { account } = useWeb3();

	const content = account ? (
		<>Set Buy Now</>
	) : (
		<ConnectWallet message={'Connect your wallet.'} />
	);

	return content;
};
